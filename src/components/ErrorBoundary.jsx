import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("UI error:", error, info); }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, background: "#fee2e2", color: "#991b1b", borderRadius: 8 }}>
          <strong>Se produjo un error en la UI.</strong>
          <div style={{ marginTop: 8, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
            {String(this.state.error?.message || this.state.error)}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
