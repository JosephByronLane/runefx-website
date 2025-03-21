# RuneFX Website Development Guide

## Commands
- `npm run start` - Start dev server at http://localhost:4200/
- `npm run build` - Build for production
- `npm run watch` - Build with auto-reload during development
- `npm run test` - Run unit tests with Karma
- `ng test --include=**/component-name/*.spec.ts` - Run a specific test
- `ng generate component components/component-name` - Generate new component
- `ng generate service services/service-name` - Generate new service

## Code Style Guidelines
- **TypeScript**: Strict mode enabled with noImplicitReturns, noFallthroughCasesInSwitch
- **Components**: Use Angular standalone components with imports array
- **Naming**: Use kebab-case for files, PascalCase for classes, camelCase for methods/properties
- **File Structure**: Group by feature in directories (components/, services/, pages/)
- **Imports**: Group imports by Angular modules, then project modules/components
- **Services**: Use dependency injection, prefer observables for async operations
- **Error Handling**: Subscribe to observables with error handlers, use ngOnDestroy for cleanup
- **Comments**: Keep comments minimal and focused on complex logic explanation