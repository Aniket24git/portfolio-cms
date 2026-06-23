# Portfolio Architecture

This portfolio is a single-page React application built with Vite, emphasizing clean design and solid architecture.

## Getting Started

1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in your Firebase details.
4. Run `npm run dev`.

## Architecture Details

- **Content Schema**: All data structures are strictly validated using `zod` in `src/content/contentSchema.js`.
- **Repository Pattern**: We use a `ContentRepository` interface to decouple the React UI from the backend. The default implementation is `LocalContentRepository`, which stores data in `localStorage`. There is also a `FirebaseContentRepository`. You can swap them by altering `src/content/contentRepository.js` logic.
- **Bundle Splitting**: The Vite build is configured to split vendor code (like React and Firebase) from the main application bundle to improve loading times.

## Testing

Run tests with `npm test`. Tests use `vitest` and cover the repository and schema layer.

## Firebase Configuration

If you decide to use Firebase for a live admin panel, update the `.env` file with your credentials, and deploy `firestore.rules` and `storage.rules` to secure the backend.
