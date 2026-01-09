import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🚀 Coming Soon</h1>
        <p style={styles.message}>
          This feature is currently under development and will be available soon.
        </p>
        <p style={styles.submessage}>
          We're working hard to bring you an amazing experience!
        </p>
        <button 
          style={styles.button}
          onClick={() => navigate("/")}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  content: {
    textAlign: "center",
    backgroundColor: "white",
    padding: "60px 40px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    maxWidth: "500px",
  },
  title: {
    fontSize: "48px",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "700",
  },
  message: {
    fontSize: "20px",
    color: "#666",
    marginBottom: "10px",
    lineHeight: "1.6",
  },
  submessage: {
    fontSize: "16px",
    color: "#999",
    marginBottom: "40px",
  },
  button: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#764ba2",
  },
};

export default ComingSoon;