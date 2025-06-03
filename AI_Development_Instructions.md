# AI Development Instructions
## SaaS Platform Development Guide

### Document Control
- **Last Updated:** 2025-06-03
- **Version:** 1.0
- **Purpose:** Guide for AI-assisted development of the SaaS platform

## 1. Development Principles

### 1.1 Code Quality Standards
- Follow clean code principles
- Implement SOLID design patterns
- Maintain consistent code style
- Write comprehensive documentation
- Create meaningful commit messages

### 1.2 Architecture Guidelines
- Implement modular architecture
- Use component-based design
- Follow repository pattern
- Implement service layer abstraction
- Maintain clear separation of concerns

## 2. Technical Implementation Guidelines

### 2.1 Frontend Development (Next.js)

#### Project Structure
```typescript
/src
  /app             // Next.js 13+ app directory
    /api           // API routes
    /(auth)        // Authentication routes
    /(dashboard)   // Protected dashboard routes
    layout.tsx     // Root layout
    page.tsx       // Home page
  /components      // React components
    /ui            // UI components
    /forms         // Form components
    /layouts       // Layout components
    /features      // Feature-specific components
  /hooks           // Custom React hooks
  /lib            // Third-party library configurations
  /utils          // Utility functions
  /types          // TypeScript type definitions
  /styles         // Global styles and Tailwind config
```

#### Component Development Rules
1. Create atomic, reusable components
2. Implement proper TypeScript types
3. Add JSDoc documentation
4. Include unit tests
5. Follow accessibility guidelines

#### State Management
1. Use React Context for global state
2. Implement custom hooks for complex logic
3. Utilize SWR for data fetching
4. Maintain proper loading states

### 2.2 Backend Development (Supabase)

#### Database Schema Design
1. Implement proper foreign key relationships
2. Use appropriate data types
3. Add necessary indexes
4. Implement RLS policies

#### API Implementation
1. Create type-safe database queries
2. Implement proper error handling
3. Add request validation
4. Follow RESTful principles

### 2.3 Integration Development

#### WhatsApp Integration
```typescript
// Implementation Pattern
class WhatsAppService {
  private client: WhatsAppClient;
  
  async sendMessage(params: SendMessageParams): Promise<MessageResponse> {
    try {
      // Implement proper error handling
      // Add retry logic
      // Include logging
    } catch (error) {
      // Error handling
    }
  }
}
```

#### Thermal Printing
```typescript
// Implementation Pattern
class PrinterService {
  private printer: Printer;
  
  async print(data: PrintData): Promise<PrintResponse> {
    try {
      // Validate print data
      // Check printer status
      // Handle print queue
    } catch (error) {
      // Error handling
    }
  }
}
```

## 3. Security Implementation

### 3.1 Authentication
1. Implement Supabase Auth
2. Add social login providers
3. Set up proper session management
4. Implement password policies

### 3.2 Authorization
1. Create role-based access control
2. Implement row-level security
3. Add API route protection
4. Set up audit logging

## 4. Testing Requirements

### 4.1 Unit Testing
```typescript
// Testing Pattern
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    // Act
    // Assert
  });
  
  it('should handle user interaction', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### 4.2 Integration Testing
1. Test API endpoints
2. Verify database operations
3. Check authentication flows
4. Validate business logic

## 5. Error Handling

### 5.1 Frontend Errors
```typescript
// Error Handling Pattern
try {
  // Operation
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API errors
  } else if (error instanceof ValidationError) {
    // Handle validation errors
  } else {
    // Handle unknown errors
  }
}
```

### 5.2 Backend Errors
1. Implement proper error codes
2. Add error logging
3. Create error boundaries
4. Handle edge cases

## 6. Performance Optimization

### 6.1 Frontend Optimization
1. Implement code splitting
2. Use image optimization
3. Add proper caching
4. Optimize bundle size

### 6.2 Backend Optimization
1. Implement database indexing
2. Add query optimization
3. Use proper caching strategies
4. Optimize API responses

## 7. Deployment Guidelines

### 7.1 CI/CD Pipeline
```yaml
# GitHub Actions Pattern
name: CI/CD
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
```

### 7.2 Environment Configuration
1. Set up environment variables
2. Configure deployment platforms
3. Implement monitoring
4. Set up logging

## 8. Documentation Requirements

### 8.1 Code Documentation
1. Add JSDoc comments
2. Create README files
3. Document API endpoints
4. Maintain changelog

### 8.2 User Documentation
1. Create user guides
2. Add feature documentation
3. Provide API documentation
4. Include troubleshooting guides

## 9. Monitoring and Logging

### 9.1 Application Monitoring
1. Implement error tracking
2. Add performance monitoring
3. Set up usage analytics
4. Configure alerts

### 9.2 Logging Strategy
1. Implement structured logging
2. Add log levels
3. Configure log rotation
4. Set up log analysis

## 10. Maintenance Guidelines

### 10.1 Code Maintenance
1. Regular dependency updates
2. Security patches
3. Performance optimization
4. Technical debt management

### 10.2 Database Maintenance
1. Regular backups
2. Index optimization
3. Data cleanup
4. Performance monitoring