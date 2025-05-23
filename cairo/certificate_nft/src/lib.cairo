// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts for Cairo ^1.0.0

const MINTER_ROLE: felt252 = selector!("MINTER_ROLE");
const UPGRADER_ROLE: felt252 = selector!("UPGRADER_ROLE");

#[starknet::contract]
mod MentorCertNFT {
    use openzeppelin::access::accesscontrol::{AccessControlComponent, DEFAULT_ADMIN_ROLE};
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::token::erc721::extensions::ERC721EnumerableComponent;
    use openzeppelin::upgrades::UpgradeableComponent;
    use openzeppelin::upgrades::interface::IUpgradeable;
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use starknet::{ClassHash, ContractAddress};
    use super::{MINTER_ROLE, UPGRADER_ROLE};

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(
        path: ERC721EnumerableComponent, storage: erc721_enumerable, event: ERC721EnumerableEvent,
    );
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    // External
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;
    #[abi(embed_v0)]
    impl AccessControlCamelImpl =
        AccessControlComponent::AccessControlCamelImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721EnumerableImpl =
        ERC721EnumerableComponent::ERC721EnumerableImpl<ContractState>;

    // Internal
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;
    impl ERC721EnumerableInternalImpl = ERC721EnumerableComponent::InternalImpl<ContractState>;
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[derive(Drop, starknet::Store, Copy, Serde)]
    struct CertificateInfo {
        certificate_id: felt252,
        theme: felt252,
        score: u256,
    }

    #[storage]
    struct Storage {
        // Track mint limits for each address
        mint_limits: Map<ContractAddress, u256>,
        // Track current mint count for each address
        mint_counts: Map<ContractAddress, u256>,
        // Store certificate information for each token
        certificate_info: Map<u256, CertificateInfo>,
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        erc721_enumerable: ERC721EnumerableComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        ERC721EnumerableEvent: ERC721EnumerableComponent::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        default_admin: ContractAddress,
        minter: ContractAddress,
        upgrader: ContractAddress,
    ) {
        self.erc721.initializer("MentorCertNFT", "MCNFT", "https://mentor-cert-ai.vercel.app/api/nfts/");
        self.accesscontrol.initializer();
        self.erc721_enumerable.initializer();
        self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, default_admin);
        self.accesscontrol._grant_role(MINTER_ROLE, minter);
        self.accesscontrol._grant_role(UPGRADER_ROLE, upgrader);
    }

    impl ERC721HooksImpl of ERC721Component::ERC721HooksTrait<ContractState> {
        fn before_update(
            ref self: ERC721Component::ComponentState<ContractState>,
            to: ContractAddress,
            token_id: u256,
            auth: ContractAddress,
        ) {
            let mut contract_state = self.get_contract_mut();
            contract_state.erc721_enumerable.before_update(to, token_id);
        }
    }

    #[generate_trait]
    #[abi(per_item)]
    impl ExternalImpl of ExternalTrait {
        #[external(v0)]
        fn add_admin(ref self: ContractState, new_admin: ContractAddress) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, new_admin);
        }

        #[external(v0)]
        fn increment_mint_limit(ref self: ContractState, user: ContractAddress) {
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.accesscontrol._grant_role(MINTER_ROLE, user);
            let current_limit = self.mint_limits.read(user);
            self.mint_limits.write(user, current_limit + 1);
        }

        #[external(v0)]
        fn get_mint_limit(ref self: ContractState, user: ContractAddress) -> u256 {
            self.mint_limits.read(user)
        }

        #[external(v0)]
        fn get_mint_count(ref self: ContractState, user: ContractAddress) -> u256 {
            self.mint_counts.read(user)
        }

        #[external(v0)]
        fn get_certificate_info(ref self: ContractState, token_id: u256) -> CertificateInfo {
            self.certificate_info.read(token_id)
        }

        #[external(v0)]
        fn safe_mint(
            ref self: ContractState,
            recipient: ContractAddress,
            certificate_id: felt252,
            theme: felt252,
            score: u256,
            token_id: u256,
            data: felt252,
        ) {
            self.accesscontrol.assert_only_role(MINTER_ROLE);

            // Check if user has reached their mint limit
            let current_count = self.mint_counts.read(recipient);
            let mint_limit = self.mint_limits.read(recipient);

            assert(current_count < mint_limit, 'Mint limit reached');

            // Store certificate information
            let cert_info = CertificateInfo { certificate_id, theme, score };
            self.certificate_info.write(token_id, cert_info);

            // Increment mint count
            self.mint_counts.write(recipient, current_count + 1);

            let mut data_array = ArrayTrait::new();
            data_array.append(data);
            self.erc721.safe_mint(recipient, token_id, data_array.span());
        }
    }

    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            self.accesscontrol.assert_only_role(UPGRADER_ROLE);
            self.upgradeable.upgrade(new_class_hash);
        }
    }
}
