import {
    ErrorBoundary,
    FallbackProps,
    useErrorBoundary,
  } from "react-error-boundary";

  interface ErrorViewProps {
    error: any
  }
  
  export function ErrorView({ error }: ErrorViewProps) {
    const errors = error?.errors
      ? Object.keys(error?.errors).map((key) => {return {key:key, value:error?.errors[key]}})
      : []
    return (
      <>
      <h4>{error?.name}</h4>
      <h5>{error?.message}</h5>
      <ul>
        {errors?.map((e)=>{return(<li>{e.key} - {e.value}</li>)})}
      </ul>
      </>
    );
  }