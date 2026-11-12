# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@pixella.dev

Do NOT create a public GitHub issue.

We will respond within 48 hours.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Measures

### Data Protection
- All passwords hashed with bcrypt
- API keys encrypted at rest
- HTTPS enforced in production
- Row-level security (RLS) enabled

### Authentication
- NextAuth.js v5 for secure auth
- OAuth with Google/GitHub
- Session tokens encrypted
- CSRF protection enabled

### API Security
- Rate limiting implemented
- Input validation with Zod
- SQL injection prevention
- XSS protection

### Database
- Supabase RLS policies
- Encrypted connections
- Regular backups
- Access logging

## Best Practices

### For Users
- Use strong, unique passwords
- Enable2FA when available
- Don't share API keys
- Review permissions regularly

### For Developers
- Never commit secrets
- Use environment variables
- Keep dependencies updated
- Follow OWASP guidelines
