# React Development Guidelines

## 1. Component Patterns

### Rule 1.1: Use Functional Components
Always use functional components with hooks instead of class components.

✅ Correct:
```tsx
const StudentDashboard: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  
  return (
    <div>
      <h1>My Certificates</h1>
      <CertificateList certificates={certificates} />
    </div>
  );
};
```

❌ Incorrect:
```tsx
class StudentDashboard extends React.Component {
  state = {
    certificates: []
  };
  
  render() {
    return (
      <div>
        <h1>My Certificates</h1>
        <CertificateList certificates={this.state.certificates} />
      </div>
    );
  }
}
```

### Rule 1.2: Component Composition
Break down complex components into smaller, reusable pieces.

✅ Correct:
```tsx
const ExamPage: React.FC = () => {
  return (
    <div>
      <ExamHeader />
      <QuestionList />
      <ExamTimer />
      <SubmitButton />
    </div>
  );
};
```

❌ Incorrect:
```tsx
const ExamPage: React.FC = () => {
  return (
    <div>
      {/* All exam logic and UI in one component */}
      <h1>Exam</h1>
      {questions.map(q => (
        <div>
          <h2>{q.title}</h2>
          <p>{q.description}</p>
          <input type="radio" />
          {/* ... more exam logic */}
        </div>
      ))}
    </div>
  );
};
```

## 2. State Management

### Rule 2.1: Use React Query for Server State
Use React Query for managing server state and API calls.

✅ Correct:
```tsx
const CertificateList: React.FC = () => {
  const { data: certificates, isLoading } = useQuery(
    'certificates',
    fetchCertificates
  );

  if (isLoading) return <LoadingSpinner />;
  
  return <CertificateGrid certificates={certificates} />;
};
```

❌ Incorrect:
```tsx
const CertificateList: React.FC = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates()
      .then(data => {
        setCertificates(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  
  return <CertificateGrid certificates={certificates} />;
};
```

### Rule 2.2: Use Context for Global State
Use React Context for global state that needs to be accessed by multiple components.

✅ Correct:
```tsx
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 3. Hooks Usage

### Rule 3.1: Custom Hooks for Reusable Logic
Extract reusable logic into custom hooks.

✅ Correct:
```tsx
const useCertificate = (certificateId: string) => {
  const { data, isLoading } = useQuery(
    ['certificate', certificateId],
    () => fetchCertificate(certificateId)
  );
  
  return { certificate: data, isLoading };
};

// Usage
const CertificateView: React.FC<{ id: string }> = ({ id }) => {
  const { certificate, isLoading } = useCertificate(id);
  // ...
};
```

❌ Incorrect:
```tsx
const CertificateView: React.FC<{ id: string }> = ({ id }) => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificate(id)
      .then(data => {
        setCertificate(data);
        setLoading(false);
      });
  }, [id]);
  // ...
};
```

### Rule 3.2: Proper Hook Dependencies
Always include all dependencies in useEffect and useCallback.

✅ Correct:
```tsx
const ExamTimer: React.FC<{ onTimeUp: () => void }> = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onTimeUp]);
  
  return <div>{formatTime(timeLeft)}</div>;
};
```

## 4. Performance Optimization

### Rule 4.1: Memoization
Use React.memo, useMemo, and useCallback for expensive computations and component re-renders.

✅ Correct:
```tsx
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveOperation(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});
```

### Rule 4.2: Code Splitting
Use React.lazy and Suspense for code splitting.

✅ Correct:
```tsx
const CertificateView = React.lazy(() => import('./CertificateView'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CertificateView />
    </Suspense>
  );
};
```

## 5. TypeScript Integration

### Rule 5.1: Strict Type Definitions
Define strict types for all props and state.

✅ Correct:
```tsx
interface Certificate {
  id: string;
  title: string;
  issueDate: Date;
  score: number;
}

interface CertificateListProps {
  certificates: Certificate[];
  onSelect: (certificate: Certificate) => void;
}

const CertificateList: React.FC<CertificateListProps> = ({
  certificates,
  onSelect
}) => {
  // ...
};
```

### Rule 5.2: Type Guards
Use type guards for runtime type checking.

✅ Correct:
```tsx
const isCertificate = (data: unknown): data is Certificate => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'issueDate' in data &&
    'score' in data
  );
};
```

## 6. Testing Conventions

### Rule 6.1: Component Testing
Use React Testing Library for component tests.

✅ Correct:
```tsx
describe('CertificateList', () => {
  it('renders certificates correctly', () => {
    const certificates = [
      { id: '1', title: 'React Basics', issueDate: new Date(), score: 85 }
    ];
    
    render(<CertificateList certificates={certificates} />);
    
    expect(screen.getByText('React Basics')).toBeInTheDocument();
  });
});
```

### Rule 6.2: Hook Testing
Test custom hooks using renderHook.

✅ Correct:
```tsx
describe('useCertificate', () => {
  it('fetches certificate data', async () => {
    const { result, waitFor } = renderHook(() => useCertificate('1'));
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.certificate).toBeDefined();
    });
  });
});
```

## 7. Error Boundaries

### Rule 7.1: Implement Error Boundaries
Use error boundaries to catch and handle runtime errors.

✅ Correct:
```tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## 8. React Router Patterns

### Rule 8.1: Route Organization
Organize routes in a centralized configuration.

✅ Correct:
```tsx
const routes = [
  {
    path: '/certificates',
    element: <CertificateList />,
    children: [
      {
        path: ':id',
        element: <CertificateView />
      }
    ]
  }
];

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </Router>
  );
};
```

## 9. Form Management

### Rule 9.1: Use React Hook Form
Use React Hook Form for form management.

✅ Correct:
```tsx
const ExamForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ExamAnswers>();
  
  const onSubmit = (data: ExamAnswers) => {
    submitExam(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('answer1', { required: true })} />
      {errors.answer1 && <span>This field is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

## 10. Data Fetching

### Rule 10.1: Use React Query for Data Fetching
Implement data fetching using React Query.

✅ Correct:
```tsx
const useCertificates = () => {
  return useQuery('certificates', async () => {
    const response = await fetch('/api/certificates');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};

const CertificateList: React.FC = () => {
  const { data, isLoading, error } = useCertificates();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <CertificateGrid certificates={data} />;
};
```

These guidelines are designed to ensure consistent, maintainable, and performant React code throughout the project. Follow these rules when implementing new features or modifying existing components. 