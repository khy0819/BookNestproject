// src/styles.ts
export const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fafafa',
    color: '#333',
    lineHeight: 1.6,
    minHeight: '100vh',
    padding: 20,
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    padding: '24px 32px',
  },
  header: {
    fontWeight: 700,
    marginBottom: 24,
    color: '#222',
    fontSize: '2.25rem',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: 12,
  },
  sectionTitle: {
    fontWeight: 700,
    marginBottom: 16,
    color: '#222',
    fontSize: '1.5rem',
    marginTop: 32,
  },
  card: {
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: 20,
    marginBottom: 24,
    transition: 'box-shadow 0.25s ease',
  },
  paragraph: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
  },
};
