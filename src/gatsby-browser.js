import createOptions from './create-options';

export const onInitialClientRender = async (_, pluginOptions) => {
  const { firstInputDelay, useLogging, useGoogleAnalytics } = createOptions(
    pluginOptions
  );

  if (firstInputDelay && window.perfMetrics) {
    window.perfMetrics.onFirstInputDelay((delay, event) => {
      if (useLogging) {
        console.group('first-input-delay');
        console.log('First Input Delay:', Math.round(delay));
        console.log('Event details', event);
        console.groupEnd();
      }
      if (useGoogleAnalytics && window.ga) {
        window.ga('send', 'event', {
          eventCategory: 'Performance Metrics',
          eventAction: 'first-input-delay',
          eventLabel: event.type,
          eventValue: Math.round(delay),
          nonInteraction: true
        });
      }
    });
  }
};
