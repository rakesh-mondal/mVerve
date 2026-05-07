import { ViteReactSSG } from "vite-react-ssg";
import "./index.css";
import { routes } from "./routes.jsx";

export const createRoot = ViteReactSSG({ routes });
