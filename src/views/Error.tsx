import {
    ErrorBoundary,
    FallbackProps,
    useErrorBoundary,
  } from "react-error-boundary";
  
  export function ErrorScreen({ error, resetErrorBoundary }: FallbackProps) {
    return (
      <div className="d-flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-red-600 mb-4">{error.name}</h1>
          <p className="text-2xl text-gray-300 font-semibold">{error.message}</p>
          <button className="mt-4" onClick={resetErrorBoundary}>
            обновить
          </button>
        </div>
      </div>
    );
  }