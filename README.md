# MentorCertAI - 1-on-1 Mentoring Platform with Blockchain Certification

## Description

MentorCertAI is a web platform that enables mentors to conduct 1-on-1 video calls with their students, automatically generating verifiable certificates on the Starknet blockchain. The platform integrates automatic transcription, AI analysis for personalized exams, and certificate issuance with associated NFTs.

## Key Features

- 📹 1-on-1 video calls between mentors and students
- 🎯 Automatic session transcription
- 🤖 AI analysis for personalized exam generation
- 📝 Automatic generation of verifiable certificates
- 🔗 Starknet integration for certificate NFTs
- 📱 Custom landing page for students

## System Requirements

- Node.js >= 18.x
- Python >= 3.8 (for AI integration)
- PostgreSQL database
- Zoom/Google Meet developer account
- Starknet access (testnet for development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/mentor-cert-ai.git
cd mentor-cert-ai
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

5. Initialize the database:
```bash
npm run db:migrate
```

## Project Structure

```
mentor-cert-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── tests/
└── contracts/
    └── starknet/
```

## Workflow

1. **Scheduling**: Mentor schedules a video call with the student
2. **Video Call**: 1-on-1 session is conducted
3. **Transcription**: System automatically obtains the transcription
4. **Analysis**: AI analyzes content and generates an exam
5. **Evaluation**: Student completes the exam
6. **Certification**: If passed (>70%), certificate and NFT are generated

## Development

### Project Phases

1. **Phase 1**: Initial Setup and Basic Structure
   - Backend and frontend setup
   - Initial data model
   - Basic routes

2. **Phase 2**: Video Call Integration
   - Zoom/Google Meet integration
   - Transcription system

3. **Phase 3**: AI Analysis
   - Language model integration
   - Exam generation

4. **Phase 4**: Frontend and Certificates
   - Exam interface
   - Certificate system

5. **Phase 5**: Blockchain
   - Starknet contract
   - Certificate NFTs

6. **Phase 6**: Testing and Deployment
   - Complete testing
   - Production deployment

### Development Guidelines

- Follow code conventions in `instructions/rules/cursor_rules.md`
- Maintain test coverage > 80%
- Document significant changes
- Review PRs before merge

## API Endpoints

### Students
- `POST /api/students` - Create new student
- `GET /api/students/:id` - Get student
- `GET /api/students/:id/certificates` - List certificates

### Certificates
- `POST /api/certificates` - Generate certificate
- `GET /api/certificates/:id` - Get certificate
- `GET /api/certificates/:id/nft` - Get associated NFT

### Exams
- `POST /api/exams` - Generate exam
- `POST /api/exams/:id/submit` - Submit answers
- `GET /api/exams/:id/results` - Get results

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

- Development Team - dev@mentorcertai.com
- Website - [https://mentorcertai.com](https://mentorcertai.com)

## Acknowledgments

- [Starknet](https://starknet.io/) for blockchain infrastructure
- [Blockcerts](https://www.blockcerts.org/) for certificate standard
- [Zoom/Google Meet](https://zoom.us/) for video call APIs 