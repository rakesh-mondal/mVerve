import { useNavigate } from "react-router-dom";

export default function PageWrapper({ Component }) {
  const rrNavigate = useNavigate();
  // Preserve existing page API: pages call navigate("contact") etc.
  const navigate = (route) => rrNavigate(route ? `/${route}` : "/");
  return <Component navigate={navigate} />;
}
