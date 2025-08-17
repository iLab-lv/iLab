export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          padding: "4rem 2rem",
          background: "var(--color-surface-2, #141414)",
          textAlign: "center",
        }}
      >
        <h1>Fast Mobile Repairs in Riga</h1>
        <p>Same-day fixes. 90-day warranty. Two locations: Domina & Spice Home.</p>
        <button
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            background: "#22D3EE",
            border: "none",
            borderRadius: "4px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Book a Repair
        </button>
      </section>

      {/* Section 1 */}
      <section
        style={{
          padding: "3rem 2rem",
          background: "var(--color-surface-1, #0A0A0A)",
        }}
      >
        <h2>Our Services</h2>
        <ul>
          <li>Screen Replacement</li>
          <li>Battery Replacement</li>
          <li>Charging Port Repair</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section
        style={{
          padding: "3rem 2rem",
          background: "var(--color-surface-3, #1F1F1F)",
        }}
      >
        <h2>Why Choose iLab?</h2>
        <p>
          Trusted repairs, transparent pricing, and quick turnaround from certified
          technicians.
        </p>
      </section>
    </main>
  );
}
