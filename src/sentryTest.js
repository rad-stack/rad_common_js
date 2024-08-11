export class SentryTest {
  static setup() {
    document.querySelector('[href="/sentry_tests/new"]').addEventListener('click', function (e) {
      setTimeout(() => {
        throw new Error('Sentry Test Error (JS)');
      });
    });
  }
}
