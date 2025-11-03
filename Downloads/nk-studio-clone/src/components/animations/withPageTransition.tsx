import { useState, useEffect } from 'react';
import PageTransition from './PageTransition';
import LoadingAnimation from './LoadingAnimation';

// Higher-order component that adds page transitions and loading effects
export default function withPageTransition<P extends object>(Component: React.ComponentType<P>) {
  return function WithPageTransition(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate asset loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <LoadingAnimation isLoading={isLoading} />
        {!isLoading && (
          <PageTransition>
            <Component {...props} />
          </PageTransition>
        )}
      </>
    );
  };
}
