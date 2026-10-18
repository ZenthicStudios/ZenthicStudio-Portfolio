import { Component, type ReactNode } from "react";
import { site } from "../data/site";
import { socials } from "../data/socials";
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="error-screen">
        <h1>{site.error.title}</h1>
        <p>{site.error.message}</p>
        <button
          className="button button-primary"
          onClick={() => window.location.reload()}
        >
          {site.error.retry}
        </button>
        <a href={socials[1].href}>{socials[1].value}</a>
      </main>
    );
  }
}
