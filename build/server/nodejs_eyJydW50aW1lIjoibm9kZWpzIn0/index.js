import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, useNavigate, Link, Meta, Links, ScrollRestoration, Scripts, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, useLoaderData, useParams, NavLink, Form, useRevalidator } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createContext, useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faChevronLeft, faChevronRight, faHeart, faSpinner, faRefresh, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as THREE from "three";
import { EffectComposer, RenderPass, EffectPass, Effect } from "postprocessing";
import { faHeart as faHeart$1 } from "@fortawesome/free-regular-svg-icons";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
}
function useTheme() {
  return useContext(ThemeContext);
}
const faMicroCode = {
  prefix: "fac",
  iconName: "microcode",
  icon: [
    182.26,
    233.5,
    [],
    "e001",
    "m 74.012429,0.34149193 c -1.135327,0.190764 -2.619639,0.608277 -3.299089,0.92736397 -0.679186,0.319352 -1.489604,0.677334 -1.800754,0.795867 -2.490523,0.946679 -6.283325,4.421981 -7.932473,7.268369 -1.681427,2.9019501 -2.221706,4.3550411 -2.901421,7.8052081 -0.489215,2.482585 -0.49186,3.867679 -0.0127,6.217708 1.035315,5.075503 2.474648,8.079582 5.411258,11.292682 1.543579,1.688835 4.729692,3.921919 6.562196,4.599252 0.700881,0.259027 1.423194,0.5842 1.604963,0.722577 0.252147,0.191558 0.330729,2.215621 0.330729,8.520906 0,9.167813 -0.20029,10.834688 -1.649942,13.734785 -1.380067,2.760663 -3.74941,4.927071 -7.638785,6.984997 -1.075796,0.56939 -2.551377,1.36975 -3.278981,1.77906 -1.122892,0.6313 -4.914636,2.68446 -15.345834,8.30898 -1.018645,0.54927 -3.280833,1.74757 -5.027083,2.66303 -1.74625,0.91546 -3.294062,1.74942 -3.439583,1.8534 -0.145521,0.10398 -1.693333,0.93716 -3.439583,1.85129 -1.74625,0.91414 -3.770313,1.98623 -4.497917,2.38231 -0.727604,0.39634 -2.125398,1.15067 -3.105944,1.67666 -3.655484,1.9603 -6.540236,3.89599 -9.06489,6.08172 -7.8337831,6.782593 -13.1622261,16.317113 -14.94128506,26.735353 -0.600075,3.51313 -0.732102,9.99543 -0.259556,12.73175 0.150813,0.87312 0.395552,2.30187 0.543719,3.175 0.69691196,4.10289 3.60997496,10.96592 6.44604396,15.18576 2.7651601,4.11427 4.8947911,6.44736 9.1371201,10.01024 5.119423,4.29948 13.030465,7.67451 22.225,9.48161 1.236927,0.24315 3.082396,0.67548 4.101042,0.96044 1.018646,0.28522 2.506927,0.69347 3.307291,0.90752 0.800365,0.21405 2.229115,0.69532 3.175,1.06971 0.945886,0.37439 2.315104,0.91493 3.042709,1.20121 5.658379,2.22594 10.474325,5.4647 15.223331,10.23832 4.382558,4.40504 7.043208,8.42221 9.128654,13.78373 1.711325,4.39949 2.103702,7.64963 2.364052,19.57916 0.195262,8.94583 0.292364,9.44536 2.153444,11.08366 2.949045,2.59583 7.563119,1.82404 9.568919,-1.60046 l 0.67257,-1.14882 0.0238,-19.44688 c 0.0249,-20.45996 -5.3e-4,-19.96625 1.25227,-24.40199 1.75975,-6.2304 6.24629,-11.82026 12.151,-15.13813 1.51791,-0.85302 3.00328,-1.6981 3.30067,-1.87775 0.61516,-0.372 7.44802,-4.15316 9.64565,-5.3377 0.80037,-0.43154 2.40771,-1.29805 3.57188,-1.92564 4.07141,-2.19525 13.51095,-7.3578 15.47812,-8.46534 1.09141,-0.61437 2.57969,-1.44489 3.3073,-1.84547 0.7276,-0.40058 2.39447,-1.32292 3.70416,-2.04947 2.20689,-1.22449 5.17472,-2.84691 6.74688,-3.68855 0.88714,-0.47493 1.39409,-0.44847 2.14709,0.11245 2.11958,1.57876 6.23782,2.7051 9.89145,2.7051 9.21253,0 17.07991,-6.10421 19.18494,-14.88546 2.03729,-8.49736 -2.60827,-17.99193 -10.6262,-21.7178 -3.43191,-1.5949 -4.74715,-1.88277 -8.55874,-1.87404 -3.79889,0.009 -5.21124,0.31803 -8.37115,1.83224 -4.34843,2.08412 -8.01397,5.94836 -9.45886,9.97162 -1.35493,3.77348 -1.55892,6.23755 -0.93768,11.3276 0.13838,1.13242 0.10266,1.2147 -0.72999,1.68328 -0.48127,0.27093 -2.78024,1.53564 -5.10857,2.81067 -2.32833,1.27476 -5.95974,3.2676 -8.06979,4.4286 -3.7084,2.03993 -5.40994,2.96598 -9.19427,5.00353 -0.98214,0.5289 -3.69094,2.00025 -6.01927,3.26972 -4.41643,2.40771 -10.31241,5.58509 -14.15522,7.62873 -2.47147,1.31392 -5.89227,3.48933 -7.54062,4.79505 -1.48193,1.17369 -4.87839,4.5085 -5.98699,5.87798 -2.059254,2.5445 -4.463258,6.73285 -5.404381,9.41546 -0.267759,0.76412 -0.640821,1.38907 -0.828411,1.38907 -0.187589,0 -0.639233,-0.44636 -1.0033,-0.99219 -0.364066,-0.54557 -0.864129,-1.28985 -1.111514,-1.65365 -2.492111,-3.66606 -3.802063,-6.15897 -5.005388,-9.525 -1.558925,-4.3606 -2.095235,-10.44072 -1.2954,-14.68437 0.39714,-2.10688 0.481277,-2.38787 1.54305,-5.15938 1.43219,-3.7383 4.797954,-7.95549 8.298921,-10.39839 1.369748,-0.95567 7.224713,-4.21428 13.047403,-7.26149 1.6764,-0.87736 3.75999,-1.97987 4.6302,-2.45004 5.54779,-2.99693 7.96529,-4.32382 8.19706,-4.49897 0.14552,-0.11007 1.69334,-0.94615 3.43959,-1.85764 1.74625,-0.91149 3.9489,-2.07195 4.89479,-2.57837 4.51352,-2.4167 5.76712,-3.08372 6.74687,-3.59013 4.63921,-2.39792 9.44933,-6.75402 12.60819,-11.41809 3.35995,-4.960683 5.06413,-9.699363 6.18543,-17.197923 0.0871,-0.58208 0.20849,-1.31048 0.26961,-1.61845 0.0778,-0.39026 0.77364,-0.89694 2.29817,-1.67243 7.26229,-3.69438 11.56864,-10.5455 11.56864,-18.404949 0,-5.847027 -2.34341,-11.136312 -6.69713,-15.115116 -4.95803,-4.531254 -11.89302,-6.544204 -18.16603,-5.273146 -1.22528,0.248179 -2.35082,0.529167 -2.50137,0.624152 -0.15055,0.09525 -0.82206,0.359833 -1.49172,0.588169 -1.97167,0.672306 -4.92654,2.606939 -6.83128,4.473046 -3.46048,3.39037 -5.24589,6.90536 -5.98937,11.792479 -0.36354,2.388658 -0.36168,2.924704 0.0175,5.513916 0.23125,1.577446 0.52282,3.065729 0.6485,3.307289 0.12541,0.24157 0.53472,1.18745 0.9099,2.10212 1.37319,3.34989 3.69702,6.22908 6.7474,8.3603 1.86214,1.30096 5.23479,3.07367 5.84835,3.07367 0.33946,0 0.33259,1.27158 -0.0191,3.43958 -0.93318,5.75389 -3.93382,10.396 -9.27285,14.346233 -0.90302,0.66808 -12.23883,6.82043 -12.56665,6.82043 -0.0844,0 -0.46937,0.22225 -0.85566,0.49372 -0.38629,0.27172 -2.96439,1.6584 -5.72929,3.0816 -2.7649,1.42346 -6.27724,3.26972 -7.80521,4.10316 -1.52797,0.83343 -4.20687,2.26456 -5.95312,3.18002 -1.746254,0.91573 -3.589606,1.94257 -4.096283,2.2823 -0.506677,0.33972 -0.997479,0.61754 -1.090612,0.61754 -0.296598,0 -5.067565,2.77653 -6.85165,3.98753 -0.945886,0.64188 -3.148542,2.59847 -4.894792,4.34816 -4.278312,4.28599 -6.410325,7.70917 -8.498416,13.64483 -1.048544,2.98027 -1.945746,8.36692 -1.949715,11.70543 -0.0029,2.34844 0.828675,8.54578 1.320006,9.83827 0.652463,1.71582 0.291306,1.80551 -2.264833,0.56118 -2.27674,-1.10808 -6.990821,-2.94693 -8.583083,-3.34777 -0.654844,-0.1651 -1.846527,-0.5125 -2.648215,-0.77206 -0.801952,-0.25982 -3.123671,-0.78846 -5.159375,-1.17501 -7.268104,-1.3798 -11.449579,-2.91148 -15.608036,-5.71765 -7.016485,-4.73472 -11.431322,-11.87741 -12.676451,-20.50917 -0.547423,-3.79413 -0.528638,-5.96345 0.08255,-9.52104 1.288785,-7.50331 5.512329,-14.69628 11.500643,-19.58578 3.039799,-2.48232 3.990711,-3.01466 32.578675,-18.244073 11.973454,-6.37858 13.449829,-7.21546 15.561469,-8.82148 6.005512,-4.56723 9.56601,-9.961029 11.208808,-16.980954 0.395817,-1.691745 0.467783,-3.424502 0.487362,-11.75041 l 0.02302,-9.766035 2.202658,-1.142471 c 2.6072,-1.352815 3.6449,-2.105554 5.50174,-3.992827 3.31629,-3.370263 5.09853,-7.204075 5.6187,-12.087225 C 98.89542,15.407396 95.76329,8.2464479 90.15703,4.0258149 85.588215,0.58596693 80.061333,-0.67530207 74.012429,0.34149193 M 75.160456,13.199713 c -2.096293,0.637381 -3.55891,2.513012 -4.412456,5.658379 -0.564621,2.080154 0.277019,5.246423 1.852348,6.968066 0.840846,0.918899 3.283744,1.979349 4.861983,2.110053 1.955271,0.162189 4.28625,-0.745331 5.798079,-2.257161 2.221178,-2.221177 2.758282,-5.792523 1.279261,-8.503444 -0.840317,-1.539875 -2.275152,-2.914914 -3.794919,-3.636168 -1.146704,-0.544248 -4.283869,-0.735013 -5.584296,-0.339725 m 57.273034,43.49697 c -2.11614,0.86995 -2.71807,1.347788 -3.96981,3.152775 -1.05701,1.524 -1.05833,1.529027 -1.05542,4.079611 0.003,2.417762 0.0479,2.624666 0.84799,3.876939 1.65311,2.586829 3.88567,3.844399 6.78471,3.821639 3.96927,-0.031 6.86911,-2.27356 7.73033,-5.977728 0.91519,-3.937 -1.40812,-7.711017 -5.70865,-9.273381 -1.3933,-0.506413 -2.8665,-0.404284 -4.62915,0.320145 m 28.83852,65.199417 c -1.24963,0.30427 -2.30214,0.94853 -3.34222,2.04602 -1.44436,1.52348 -1.9378,2.80459 -1.91717,4.97682 0.0212,2.26589 0.84588,3.90657 2.6596,5.29166 4.52596,3.45546 11.32152,-0.17198 10.86961,-5.80231 -0.34793,-4.33255 -4.33282,-7.47051 -8.26982,-6.51219"
  ]
};
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  };
  const login2 = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };
  const logout2 = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { isLoggedIn, user, login: login2, logout: logout2, loading }, children });
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
const routes$1 = [
  { path: "/", file: "routes/_index.jsx", showInNav: false },
  {
    path: "/courses",
    file: "routes/courses.jsx",
    showInNav: true,
    label: "courses",
    navTo: "/courses/frontend",
    children: [
      { path: ":tab", file: "routes/courses.$tab.jsx" }
    ]
  },
  { path: "/courses/:tab/:courseId", file: "routes/courses.$tab.$courseId.jsx", showInNav: false },
  { path: "/blog", file: "routes/blog.jsx", showInNav: true, label: "blogs" },
  { path: "/blog/:id", file: "routes/blog.$blogId.jsx", showInNav: false },
  { path: "/about", file: "routes/about.jsx", showInNav: true, label: "about us" },
  { path: "/contact", file: "routes/contact.jsx", showInNav: true, label: "contact" },
  { path: "/login", file: "routes/login.jsx", showInNav: true, label: "login | signup" },
  { path: "/profile", file: "routes/profile.jsx", showInNav: false },
  { path: "/logout", file: "routes/logout.jsx", showInNav: false }
];
const API_BASE_URL = "http://127.0.0.1:5000";
function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
    return null;
  }
}
function buildHeaders(additionalHeaders = {}) {
  const headers = new Headers(additionalHeaders);
  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return headers;
}
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = buildHeaders(options.headers);
  const response = await fetch(url, {
    ...options,
    headers
  });
  return response;
}
async function apiUpload(endpoint, formData) {
  const token = getAuthToken();
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: formData
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: response.statusText
    }));
    throw new Error(errorData.error || `Upload failed: ${response.status}`);
  }
  return response.json();
}
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn: loggedIn, user, logout: logout2 } = useAuth();
  const location = useLocation();
  useNavigate();
  const navRoutes = routes$1.filter((e) => e.showInNav);
  const navbarRef = useRef(null);
  const brandRef = useRef(null);
  const loginRef = useRef(null);
  const profileRef = useRef(null);
  const navPillsRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});
  const [pillType, setPillType] = useState("nav");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = navbarRef.current;
      const collapse = navbar?.querySelector(".navbar-collapse");
      if (collapse && collapse.classList.contains("show")) {
        if (!navbar.contains(event.target)) {
          const toggler = navbar.querySelector(".navbar-toggler");
          toggler?.click();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const navbar = navbarRef.current;
    const collapse = navbar?.querySelector(".navbar-collapse");
    if (!collapse) return;
    const handleCollapse = () => setIsNavCollapsed(true);
    const handleShow = () => setIsNavCollapsed(false);
    const handleCollapsing = () => setIsNavCollapsed(true);
    collapse.addEventListener("hidden.bs.collapse", handleCollapse);
    collapse.addEventListener("shown.bs.collapse", handleShow);
    collapse.addEventListener("hide.bs.collapse", handleCollapsing);
    setIsNavCollapsed(!collapse.classList.contains("show"));
    return () => {
      collapse.removeEventListener("hidden.bs.collapse", handleCollapse);
      collapse.removeEventListener("shown.bs.collapse", handleShow);
      collapse.removeEventListener("hide.bs.collapse", handleCollapsing);
    };
  }, []);
  useEffect(() => {
    const updatePillPosition = () => {
      let activeElement = null;
      let containerElement = null;
      let newPillType = "nav";
      if (location.pathname === "/" && brandRef.current) {
        activeElement = brandRef.current;
        containerElement = navbarRef.current;
        newPillType = "brand";
      } else if (location.pathname === "/login" && loginRef.current) {
        activeElement = loginRef.current;
        containerElement = navbarRef.current;
        newPillType = "login";
      } else if (location.pathname === "/profile" && profileRef.current) {
        activeElement = profileRef.current;
        containerElement = navbarRef.current;
        newPillType = "profile";
      } else if (navPillsRef.current) {
        const isMobile = window.innerWidth < 992;
        const shouldShowNavPill = !isMobile || !isNavCollapsed;
        if (shouldShowNavPill) {
          activeElement = navPillsRef.current.querySelector(".nav-link.active");
          containerElement = navPillsRef.current;
          newPillType = "nav";
        }
      }
      if (activeElement && containerElement) {
        containerElement.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        const navbarRect = navbarRef.current.getBoundingClientRect();
        setPillStyle({
          left: `${activeRect.left - navbarRect.left}px`,
          top: `${activeRect.top - navbarRect.top}px`,
          width: `${activeRect.width}px`,
          height: `${activeRect.height}px`,
          opacity: 1
        });
        setPillType(newPillType);
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };
    const timer = setTimeout(updatePillPosition, 10);
    window.addEventListener("resize", updatePillPosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePillPosition);
    };
  }, [location.pathname, loggedIn, isNavCollapsed]);
  const handleLoginClick = () => {
    const navbar = navbarRef.current;
    const collapse = navbar?.querySelector(".navbar-collapse");
    if (collapse && collapse.classList.contains("show")) {
      const toggler = navbar.querySelector(".navbar-toggler");
      toggler?.click();
    }
  };
  const profilePictureUrl = user?.profile_picture ? `${API_BASE_URL}${user.profile_picture}` : "https://placehold.co/50";
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: "navbar navbar-expand-lg bg-dark-subtle sticky-top p-2 px-5 shadow",
      ref: navbarRef,
      style: { zIndex: 99 },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `navbar-sliding-pill navbar-sliding-pill-${pillType}`,
            style: {
              ...pillStyle,
              transition: "opacity 0.05s ease, left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "container-fluid p-0", children: [
          /* @__PURE__ */ jsx("div", { className: "d-flex align-items-center gap-3", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/",
              ref: brandRef,
              className: "navbar-brand p-2 py-2 rounded-3 d-flex align-items-center gap-3 border border-2 position-relative",
              style: {
                "--bs-border-color": location.pathname === "/" ? "var(--bs-primary)" : "transparent",
                transition: "border-color 0.3s ease",
                zIndex: 2
              },
              children: [
                /* @__PURE__ */ jsx(
                  FontAwesomeIcon,
                  {
                    icon: faMicroCode,
                    widthAuto: true,
                    className: "fs-2 ms-1 text-primary"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "fs-4 fw-light text-body-emphasis", children: "MicroCode" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center gap-2 order-lg-last", children: [
            !loggedIn && navRoutes.filter((route) => route.path === "/login").map(({ path, label }) => {
              const isActive = location.pathname === path;
              return /* @__PURE__ */ jsx(
                Link,
                {
                  to: path,
                  ref: loginRef,
                  className: `btn ${isActive ? "btn-primary" : "btn-success"} text-capitalize position-relative`,
                  style: { zIndex: 2 },
                  onClick: handleLoginClick,
                  children: label
                },
                label
              );
            }),
            loggedIn && /* @__PURE__ */ jsx(
              Link,
              {
                to: "/profile",
                ref: profileRef,
                className: "d-flex align-items-center rounded-circle border border-5 position-relative overflow-hidden",
                style: {
                  "--bs-border-color": location.pathname === "/profile" ? "var(--bs-primary)" : "transparent",
                  transition: "border-color 0.3s ease",
                  zIndex: 2,
                  width: "60px",
                  height: "60px"
                },
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: profilePictureUrl,
                    alt: user?.username || "Profile",
                    className: "w-100 h-100",
                    style: { objectFit: "cover" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `btn btn-outline-${theme === "dark" ? "light" : "dark"} border-0 p-1 fs-5`,
                onClick: toggleTheme,
                children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faLightbulb })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "navbar-toggler border-0 p-1",
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#navbarNav",
                "aria-controls": "navbarNav",
                "aria-expanded": "false",
                "aria-label": "Toggle navigation",
                children: /* @__PURE__ */ jsx("span", { className: "navbar-toggler-icon" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "collapse navbar-collapse",
              id: "navbarNav",
              children: /* @__PURE__ */ jsx(
                "ul",
                {
                  className: "nav nav-pills nav-pills-animated mx-auto gap-1 fw-bold flex-column flex-lg-row align-items-end align-items-lg-center mt-3 mt-lg-0 position-relative",
                  ref: navPillsRef,
                  children: navRoutes.filter((route) => route.path !== "/login").map(({ path, label, navTo }) => {
                    const linkPath = navTo || path;
                    const isActive = path === "/" ? location.pathname === path : location.pathname.startsWith(path);
                    return /* @__PURE__ */ jsx(
                      "li",
                      {
                        className: "nav-item",
                        children: /* @__PURE__ */ jsx(
                          Link,
                          {
                            to: linkPath,
                            className: `nav-link text-capitalize position-relative ${isActive ? "active" : "text-body"}`,
                            style: { zIndex: 2 },
                            children: label
                          }
                        )
                      },
                      label
                    );
                  })
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "container-fluid bg-dark-subtle p-2", children: /* @__PURE__ */ jsx("p", { className: "m-0", children: "Footer" }) });
}
const createTouchTexture = () => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not available");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  const trail = [];
  let last = null;
  const maxAge = 64;
  let radius = 0.1 * size;
  const speed = 1 / maxAge;
  const clear = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const drawPoint = (p) => {
    const pos = { x: p.x * size, y: (1 - p.y) * size };
    let intensity = 1;
    const easeOutSine = (t) => Math.sin(t * Math.PI / 2);
    const easeOutQuad = (t) => -t * (t - 2);
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));
    else
      intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;
    intensity *= p.force;
    const color = `${(p.vx + 1) / 2 * 255}, ${(p.vy + 1) / 2 * 255}, ${intensity * 255}`;
    const offset = size * 5;
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  };
  const addTouch = (norm) => {
    let force = 0;
    let vx = 0;
    let vy = 0;
    if (last) {
      const dx = norm.x - last.x;
      const dy = norm.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / (d || 1);
      vy = dy / (d || 1);
      force = Math.min(dd * 1e4, 1);
    }
    last = { x: norm.x, y: norm.y };
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
  };
  const update = () => {
    clear();
    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i];
      const f = point.force * speed * (1 - point.age / maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > maxAge) trail.splice(i, 1);
    }
    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);
    texture.needsUpdate = true;
  };
  return {
    canvas,
    texture,
    addTouch,
    update,
    set radiusScale(v) {
      radius = 0.1 * size * v;
    },
    get radiusScale() {
      return radius / (0.1 * size);
    },
    size
  };
};
const createLiquidEffect = (texture, opts) => {
  const fragment = `
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `;
  return new Effect("LiquidEffect", fragment, {
    uniforms: /* @__PURE__ */ new Map([
      ["uTexture", new THREE.Uniform(texture)],
      ["uStrength", new THREE.Uniform(opts?.strength ?? 0.025)],
      ["uTime", new THREE.Uniform(0)],
      ["uFreq", new THREE.Uniform(opts?.freq ?? 4.5)]
    ])
  });
};
const SHAPE_MAP = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3
};
const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;
const FRAGMENT_SRC = `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  fragColor = vec4(color, M);
}
`;
const MAX_CLICKS = 10;
const PixelBlast = ({
  variant = "square",
  pixelSize = 3,
  color = "#B19EEF",
  className,
  style,
  antialias = true,
  patternScale = 2,
  patternDensity = 1,
  liquid = false,
  liquidStrength = 0.1,
  liquidRadius = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleIntensityScale = 1,
  rippleThickness = 0.1,
  rippleSpeed = 0.3,
  liquidWobbleSpeed = 4.5,
  autoPauseOffscreen = true,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.5,
  noiseAmount = 0
}) => {
  const containerRef = useRef(null);
  const visibilityRef = useRef({ visible: true });
  const speedRef = useRef(speed);
  const threeRef = useRef(null);
  const prevConfigRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    speedRef.current = speed;
    const needsReinitKeys = ["antialias", "liquid", "noiseAmount"];
    const cfg = { antialias, liquid, noiseAmount };
    let mustReinit = false;
    if (!threeRef.current) mustReinit = true;
    else if (prevConfigRef.current) {
      for (const k of needsReinitKeys)
        if (prevConfigRef.current[k] !== cfg[k]) {
          mustReinit = true;
          break;
        }
    }
    if (mustReinit) {
      if (threeRef.current) {
        const t = threeRef.current;
        t.resizeObserver?.disconnect();
        cancelAnimationFrame(t.raf);
        t.quad?.geometry.dispose();
        t.material.dispose();
        t.composer?.dispose();
        t.renderer.dispose();
        if (t.renderer.domElement.parentElement === container)
          container.removeChild(t.renderer.domElement);
        threeRef.current = null;
      }
      const canvas = document.createElement("canvas");
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
      if (transparent) renderer.setClearAlpha(0);
      else renderer.setClearColor(0, 1);
      const uniforms = {
        uResolution: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uClickPos: {
          value: Array.from(
            { length: MAX_CLICKS },
            () => new THREE.Vector2(-1, -1)
          )
        },
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
        uScale: { value: patternScale },
        uDensity: { value: patternDensity },
        uPixelJitter: { value: pixelSizeJitter },
        uEnableRipples: { value: enableRipples ? 1 : 0 },
        uRippleSpeed: { value: rippleSpeed },
        uRippleThickness: { value: rippleThickness },
        uRippleIntensity: { value: rippleIntensityScale },
        uEdgeFade: { value: edgeFade }
      };
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SRC,
        fragmentShader: FRAGMENT_SRC,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        glslVersion: THREE.GLSL3
      });
      const quadGeom = new THREE.PlaneGeometry(2, 2);
      const quad = new THREE.Mesh(quadGeom, material);
      scene.add(quad);
      const clock = new THREE.Clock();
      const setSize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(
          renderer.domElement.width,
          renderer.domElement.height
        );
        if (threeRef.current?.composer)
          threeRef.current.composer.setSize(
            renderer.domElement.width,
            renderer.domElement.height
          );
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
      };
      setSize();
      const ro = new ResizeObserver(setSize);
      ro.observe(container);
      const randomFloat = () => {
        if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
          const u32 = new Uint32Array(1);
          window.crypto.getRandomValues(u32);
          return u32[0] / 4294967295;
        }
        return Math.random();
      };
      const timeOffset = randomFloat() * 1e3;
      let composer;
      let touch;
      let liquidEffect;
      if (liquid) {
        touch = createTouchTexture();
        touch.radiusScale = liquidRadius;
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        liquidEffect = createLiquidEffect(touch.texture, {
          strength: liquidStrength,
          freq: liquidWobbleSpeed
        });
        const effectPass = new EffectPass(camera, liquidEffect);
        effectPass.renderToScreen = true;
        composer.addPass(renderPass);
        composer.addPass(effectPass);
      }
      if (noiseAmount > 0) {
        if (!composer) {
          composer = new EffectComposer(renderer);
          composer.addPass(new RenderPass(scene, camera));
        }
        const noiseEffect = new Effect(
          "NoiseEffect",
          `uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} `,
          {
            uniforms: /* @__PURE__ */ new Map([
              ["uTime", new THREE.Uniform(0)],
              ["uAmount", new THREE.Uniform(noiseAmount)]
            ])
          }
        );
        const noisePass = new EffectPass(camera, noiseEffect);
        noisePass.renderToScreen = true;
        if (composer && composer.passes.length > 0)
          composer.passes.forEach((p) => p.renderToScreen = false);
        composer.addPass(noisePass);
      }
      if (composer)
        composer.setSize(renderer.domElement.width, renderer.domElement.height);
      const mapToPixels = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const scaleX = renderer.domElement.width / rect.width;
        const scaleY = renderer.domElement.height / rect.height;
        const fx = (e.clientX - rect.left) * scaleX;
        const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
        return {
          fx,
          fy,
          w: renderer.domElement.width,
          h: renderer.domElement.height
        };
      };
      const onPointerDown = (e) => {
        const { fx, fy } = mapToPixels(e);
        const ix = threeRef.current?.clickIx ?? 0;
        uniforms.uClickPos.value[ix].set(fx, fy);
        uniforms.uClickTimes.value[ix] = uniforms.uTime.value;
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;
      };
      const onPointerMove = (e) => {
        if (!touch) return;
        const { fx, fy, w, h } = mapToPixels(e);
        touch.addTouch({ x: fx / w, y: fy / h });
      };
      renderer.domElement.addEventListener("pointerdown", onPointerDown, {
        passive: true
      });
      renderer.domElement.addEventListener("pointermove", onPointerMove, {
        passive: true
      });
      let raf = 0;
      const animate = () => {
        if (autoPauseOffscreen && !visibilityRef.current.visible) {
          raf = requestAnimationFrame(animate);
          return;
        }
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef.current;
        if (liquidEffect)
          liquidEffect.uniforms.get("uTime").value = uniforms.uTime.value;
        if (composer) {
          if (touch) touch.update();
          composer.passes.forEach((p) => {
            const effs = p.effects;
            if (effs)
              effs.forEach((eff) => {
                const u = eff.uniforms?.get("uTime");
                if (u) u.value = uniforms.uTime.value;
              });
          });
          composer.render();
        } else renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
      threeRef.current = {
        renderer,
        scene,
        camera,
        material,
        clock,
        clickIx: 0,
        uniforms,
        resizeObserver: ro,
        raf,
        quad,
        timeOffset,
        composer,
        touch,
        liquidEffect
      };
    } else {
      const t = threeRef.current;
      t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio();
      t.uniforms.uColor.value.set(color);
      t.uniforms.uScale.value = patternScale;
      t.uniforms.uDensity.value = patternDensity;
      t.uniforms.uPixelJitter.value = pixelSizeJitter;
      t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;
      t.uniforms.uRippleIntensity.value = rippleIntensityScale;
      t.uniforms.uRippleThickness.value = rippleThickness;
      t.uniforms.uRippleSpeed.value = rippleSpeed;
      t.uniforms.uEdgeFade.value = edgeFade;
      if (transparent) t.renderer.setClearAlpha(0);
      else t.renderer.setClearColor(0, 1);
      if (t.liquidEffect) {
        const uStrength = t.liquidEffect;
        if (uStrength) uStrength.value = liquidStrength;
        const uFreq = t.liquidEffect.uniforms.get("uFreq");
        if (uFreq) uFreq.value = liquidWobbleSpeed;
      }
      if (t.touch) t.touch.radiusScale = liquidRadius;
    }
    prevConfigRef.current = cfg;
    return () => {
      if (threeRef.current && mustReinit) return;
      if (!threeRef.current) return;
      const t = threeRef.current;
      t.resizeObserver?.disconnect();
      cancelAnimationFrame(t.raf);
      t.quad?.geometry.dispose();
      t.material.dispose();
      t.composer?.dispose();
      t.renderer.dispose();
      if (t.renderer.domElement.parentElement === container)
        container.removeChild(t.renderer.domElement);
      threeRef.current = null;
    };
  }, [
    antialias,
    liquid,
    noiseAmount,
    pixelSize,
    patternScale,
    patternDensity,
    enableRipples,
    rippleIntensityScale,
    rippleThickness,
    rippleSpeed,
    pixelSizeJitter,
    edgeFade,
    transparent,
    liquidStrength,
    liquidRadius,
    liquidWobbleSpeed,
    autoPauseOffscreen,
    variant,
    color,
    speed
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: `pixel-blast-container ${className ?? ""}`,
      style,
      "aria-label": "PixelBlast interactive background"
    }
  );
};
function HtmlShell({
  children,
  title = "MicroCode Inc - Cursos Para Todos"
}) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxs(
    "html",
    {
      lang: "en",
      "data-bs-theme": theme,
      children: [
        /* @__PURE__ */ jsxs("head", { children: [
          /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
          /* @__PURE__ */ jsx(
            "meta",
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1.0"
            }
          ),
          /* @__PURE__ */ jsx("title", { children: title }),
          /* @__PURE__ */ jsx(Meta, {}),
          /* @__PURE__ */ jsx(Links, {})
        ] }),
        /* @__PURE__ */ jsxs("body", { className: "d-flex flex-column min-vh-100", children: [
          /* @__PURE__ */ jsx(
            PixelBlast,
            {
              variant: "square",
              pixelSize: 6,
              color: "#0E6575",
              patternScale: 3,
              patternDensity: 1.2,
              pixelSizeJitter: 0.5,
              enableRipples: true,
              rippleSpeed: 0.4,
              rippleThickness: 0.12,
              rippleIntensityScale: 1.5,
              liquid: true,
              liquidStrength: 0.12,
              liquidRadius: 1.2,
              liquidWobbleSpeed: 5,
              speed: 0.6,
              edgeFade: 0.25,
              transparent: true,
              style: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "auto"
              }
            }
          ),
          /* @__PURE__ */ jsx(Navbar, {}),
          children,
          /* @__PURE__ */ jsx(Footer, {}),
          /* @__PURE__ */ jsx(ScrollRestoration, {}),
          /* @__PURE__ */ jsx(Scripts, {})
        ] })
      ]
    }
  );
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(AuthProvider, {
    children: /* @__PURE__ */ jsx(ThemeProvider, {
      children: /* @__PURE__ */ jsx(HtmlShell, {
        children: /* @__PURE__ */ jsx("main", {
          className: "container-fluid d-flex flex-grow-1 pb-3",
          children: /* @__PURE__ */ jsx(Outlet, {})
        })
      })
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  return /* @__PURE__ */ jsx(AuthProvider, {
    children: /* @__PURE__ */ jsx(ThemeProvider, {
      children: /* @__PURE__ */ jsx(HtmlShell, {
        children: /* @__PURE__ */ jsxs("div", {
          className: "container",
          children: [/* @__PURE__ */ jsx("h2", {
            children: "Error!"
          }), /* @__PURE__ */ jsx("h4", {
            children: error.message
          })]
        })
      })
    })
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
function CardHome({
  imgUrl = "https://placehold.co/50",
  imgAlt = "img",
  title = "Card Title",
  tags
}) {
  return /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("div", { className: "card card-hover-effect rounded-4 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "card-img-container", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: imgUrl,
        alt: imgAlt,
        className: "card-img"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "card-img-overlay text-dark d-flex flex-column p-3", children: [
      /* @__PURE__ */ jsx("span", { className: "card-title text-capitalize h5", children: title }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto", children: tags.map(({ label, color }, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "me-1 badge",
          style: { background: color },
          children: label
        },
        i
      )) })
    ] })
  ] }) }) });
}
const formatDateShort = (value) => {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  }).format(date).replace(/\//g, " / ");
};
function Carousel({ items }) {
  const [isLarge, setIsLarge] = useState(false);
  useEffect(() => {
    setIsLarge(window.innerWidth >= 992);
    const handleResize = () => setIsLarge(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const slides = isLarge ? items.reduce((acc, item, i) => {
    if (i % 2 === 0) acc.push([item]);
    else acc[acc.length - 1].push(item);
    return acc;
  }, []) : items.map((item) => [item]);
  return /* @__PURE__ */ jsxs("div", { className: "position-relative w-100 px-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "carouselInterval",
        className: "carousel slide",
        "data-bs-ride": "carousel",
        children: /* @__PURE__ */ jsx("div", { className: "carousel-inner px-4", children: slides.map((group, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `carousel-item ${i === 0 ? "active" : ""}`,
            "data-bs-interval": "5000",
            children: /* @__PURE__ */ jsx("div", { className: "row row-cols-1 row-cols-lg-2 g-3", children: group.map((item, j) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "col",
                children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    className: "card carousel-card-hover border-0 bg-secondary-subtle text-decoration-none rounded-4 d-block",
                    to: `/blog/${isLarge ? i * 2 + j : i}`,
                    children: /* @__PURE__ */ jsxs("div", { className: "row g-0", children: [
                      /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://placehold.co/175",
                          className: "img-fluid rounded-start-4 h-100",
                          alt: item.title
                        }
                      ) }),
                      /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsxs("div", { className: "card-body py-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
                          /* @__PURE__ */ jsx("h5", { className: "mb-1", children: item.title }),
                          /* @__PURE__ */ jsx("span", { className: "ms-auto text-secondary", children: formatDateShort(item.publication_date) })
                        ] }),
                        /* @__PURE__ */ jsx("h6", { className: "mb-2", children: item.author_name }),
                        /* @__PURE__ */ jsx("p", { className: "mb-0", children: item.description })
                      ] }) })
                    ] })
                  }
                )
              },
              j
            )) })
          },
          i
        )) })
      },
      isLarge ? "lg" : "sm"
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-100 bg-dark-subtle position-absolute top-50 translate-middle-y d-flex align-items-center",
        style: { left: "0.5rem" },
        children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-outline-secondary border-0 p-1 py-3 d-grid align-items-center",
            type: "button",
            "data-bs-target": "#carouselInterval",
            "data-bs-slide": "prev",
            children: /* @__PURE__ */ jsx(
              FontAwesomeIcon,
              {
                icon: faChevronLeft,
                className: "fs-5 text-bg-body"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-100 bg-dark-subtle position-absolute top-50 translate-middle-y d-flex align-items-center",
        style: { right: "0.5rem" },
        children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-outline-secondary border-0 p-1 py-3  d-grid align-items-center",
            type: "button",
            "data-bs-target": "#carouselInterval",
            "data-bs-slide": "next",
            children: /* @__PURE__ */ jsx(
              FontAwesomeIcon,
              {
                icon: faChevronRight,
                className: "fs-5 text-bg-body"
              }
            )
          }
        )
      }
    )
  ] });
}
function Jumbotron() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-dark-subtle p-5 rounded-4 shadow animate-fade-in-up", children: [
    /* @__PURE__ */ jsx("p", { className: "text-muted mb-0 fs-5", children: "Bienvenido a" }),
    /* @__PURE__ */ jsx("h1", { className: "display-1 fw-bold mb-3", children: "MicroCode" }),
    /* @__PURE__ */ jsx("p", { className: "lead", children: "Nos enorgullece ofrecer cursos accesibles y bilingües de desarrollo web (con más idiomas por añadirse). Ningún curso cuesta más de $10 y cada uno te brinda una habilidad que puedes aplicar de inmediato en un contexto real." })
  ] });
}
async function loader$2() {
  const response = await apiRequest("/home");
  const json = await response.json();
  return json;
}
const _index = UNSAFE_withComponentProps(function Home() {
  const {
    courses: courses2,
    blogs
  } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", {
    className: "container d-grid gap-4 my-4 page-transition",
    children: [/* @__PURE__ */ jsx(Jumbotron, {}), /* @__PURE__ */ jsxs("div", {
      className: "container-fluid p-5 bg-dark-subtle rounded-4 shadow",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-capitalize mb-3",
        children: "cursos"
      }), /* @__PURE__ */ jsx("div", {
        className: "row row-cols-2 row-cols-lg-4 g-2 stagger-animation",
        children: courses2.map((course) => /* @__PURE__ */ jsx(CardHome, {
          imgUrl: course.image_url,
          imgAlt: course.name,
          title: course.name,
          tags: course.tags
        }, course.id))
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "container-fluid bg-dark-subtle rounded-4 shadow p-0 pt-5 pb-4",
      children: [/* @__PURE__ */ jsx("span", {
        className: "text-capitalize h1 ps-5",
        children: "blogs"
      }), /* @__PURE__ */ jsx(Carousel, {
        items: blogs
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const courses = UNSAFE_withComponentProps(function Courses() {
  const tabs = ["frontend", "backend", "database", "git"];
  const {
    tab
  } = useParams();
  return /* @__PURE__ */ jsx("div", {
    className: "container page-transition",
    children: /* @__PURE__ */ jsx("div", {
      className: "row justify-content-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-12 col-lg-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "sticky-top bg-body z-2 pt-3",
          style: {
            top: "76px",
            width: "102%",
            transform: "translateX(-1%)"
          },
          children: /* @__PURE__ */ jsx("ul", {
            className: "nav nav-pills bg-dark-subtle flex-shrink-0 rounded-3 p-2 d-flex gap-1 shadow",
            children: tabs.map((tab2) => /* @__PURE__ */ jsx("li", {
              className: "nav-item",
              children: /* @__PURE__ */ jsx(NavLink, {
                to: `/courses/${tab2}`,
                className: "nav-link text-capitalize",
                children: tab2
              })
            }, tab2))
          })
        }), /* @__PURE__ */ jsx(Outlet, {}, tab)]
      })
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: courses
}, Symbol.toStringTag, { value: "Module" }));
function FavoriteButton({
  itemId,
  itemType,
  isFavorited,
  onToggle
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, login: login2 } = useAuth();
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    setIsLoading(true);
    try {
      const endpoint = itemType === "course" ? `/users/${user.id}/favourite-courses${isFavorited ? `/${itemId}` : ""}` : `/users/${user.id}/saved-blogs${isFavorited ? `/${itemId}` : ""}`;
      const method = isFavorited ? "DELETE" : "POST";
      const body = !isFavorited ? JSON.stringify({
        [itemType === "course" ? "course_id" : "blog_id"]: itemId
      }) : void 0;
      const response = await apiRequest(endpoint, {
        method,
        body
      });
      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }
      const updatedUser = await response.json();
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        login2(token, updatedUser);
      }
      if (onToggle) {
        onToggle(!isFavorited);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `btn btn-sm ${isFavorited ? "btn-danger" : "btn-outline-danger"} position-absolute bottom-0 start-0 m-2 z-3 border-0`,
      onClick: handleClick,
      disabled: isLoading,
      title: isFavorited ? "Remove from favorites" : "Add to favorites",
      style: {
        opacity: isLoading ? 0.6 : 1,
        transition: "all 0.2s ease",
        borderRadius: "12px"
      },
      children: /* @__PURE__ */ jsx(
        FontAwesomeIcon,
        {
          icon: isFavorited ? faHeart : faHeart$1,
          className: isLoading ? "animate-pulse" : ""
        }
      )
    }
  );
}
async function loader$1({
  params
}) {
  const {
    tab
  } = params;
  const response = await apiRequest(`/courses/${tab}`);
  const json = await response.json();
  const allCoursesResponse = await apiRequest(`/courses`);
  const allCoursesJson = await allCoursesResponse.json();
  const courseLookup = {};
  allCoursesJson.courses.forEach((course) => {
    courseLookup[course.id] = course;
  });
  return {
    courses: json.courses,
    courseLookup
  };
}
const courses_$tab = UNSAFE_withComponentProps(function CourseTab() {
  const {
    courses: courses2,
    courseLookup
  } = useLoaderData();
  const {
    tab
  } = useParams();
  const {
    isLoggedIn,
    user
  } = useAuth();
  const [favoriteCourses, setFavoriteCourses] = useState(user?.favourite_courses || []);
  const handleFavoriteToggle = (courseId, isFavorited) => {
    setFavoriteCourses((prev) => isFavorited ? [...prev, courseId] : prev.filter((id) => id !== courseId));
  };
  const renderSummary = (summary) => {
    if (!summary) return null;
    return /* @__PURE__ */ jsxs("div", {
      className: "container-fluid p-0 d-grid gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "card bg-secondary-subtle rounded-4 border-0 shadow",
        children: [/* @__PURE__ */ jsx("div", {
          className: "card-header h4 border-0 rounded-top-4 p-3",
          children: "Goal"
        }), /* @__PURE__ */ jsx("div", {
          className: "card-body shadow rounded-bottom-4 p-3",
          children: summary.goal
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "card bg-secondary-subtle rounded-4 border-0 shadow",
        children: [/* @__PURE__ */ jsx("div", {
          className: "card-header border-0 h4 rounded-top-4 shadow p-3",
          children: "Syllabus"
        }), /* @__PURE__ */ jsx("div", {
          className: "card-body p-0",
          children: /* @__PURE__ */ jsx("ol", {
            className: "list-group list-group-numbered rounded-4",
            children: summary.syllabus.map((item, idx) => /* @__PURE__ */ jsx("li", {
              className: "list-group-item bg-secondary-subtle py-3 border-0 rounded-top-0 shadow",
              children: item
            }, idx))
          })
        })]
      }), summary.requirements && summary.requirements.length > 0 && /* @__PURE__ */ jsxs("div", {
        className: "card bg-secondary-subtle rounded-4 border-0 shadow",
        children: [/* @__PURE__ */ jsx("div", {
          className: "card-header border border-0 h4 rounded-top-4 p-3",
          children: "Requirements"
        }), /* @__PURE__ */ jsx("div", {
          className: "card-body p-0",
          children: /* @__PURE__ */ jsx("ul", {
            className: "list-group rounded-4 rounded-top-0",
            children: summary.requirements.map((reqId, idx) => {
              const reqCourse = courseLookup[reqId];
              return /* @__PURE__ */ jsx(Link, {
                className: "list-group-item list-group-item-action bg-secondary-subtle text-body p-3 border-0 shadow",
                to: `/courses/${tab}/${reqId}`,
                children: reqCourse ? reqCourse.name : `Course ${reqId}`
              }, idx);
            })
          })
        })]
      })]
    });
  };
  return /* @__PURE__ */ jsx("div", {
    className: "accordion d-grid gap-3 tab-stagger pt-3",
    id: "accordionCourses",
    children: courses2.map((course) => {
      const isFavorited = favoriteCourses.includes(course.id);
      const anchorId = course.name.replace(/\s+/g, "-");
      return /* @__PURE__ */ jsxs("div", {
        className: "accordion-item border-0 bg-dark-subtle rounded-4 overflow-hidden",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "position-relative",
          children: [/* @__PURE__ */ jsx("button", {
            className: "accordion-button rounded-4 text-capitalize p-0 bg-transparent pe-3 shadow-none collapsed w-100 border-0",
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": `#${anchorId}`,
            "aria-expanded": "false",
            "aria-controls": anchorId,
            children: /* @__PURE__ */ jsx("div", {
              className: "card border-0 bg-transparent w-100",
              children: /* @__PURE__ */ jsxs("div", {
                className: "row g-0",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "col-auto",
                  children: /* @__PURE__ */ jsx("img", {
                    src: course.image_url || "https://placehold.co/175x175",
                    className: "img-fluid rounded-start-4",
                    style: {
                      width: "175px",
                      height: "175px",
                      objectFit: "cover"
                    },
                    alt: course.image_alt || course.name
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "col",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between",
                    children: [/* @__PURE__ */ jsx("h5", {
                      className: "card-title",
                      children: course.name
                    }), /* @__PURE__ */ jsx("p", {
                      className: "card-text mb-2",
                      children: course.description
                    }), course.tags && course.tags.length > 0 && /* @__PURE__ */ jsx("div", {
                      className: "d-flex gap-1",
                      children: course.tags.map((tag, i) => /* @__PURE__ */ jsx("span", {
                        className: "badge",
                        style: {
                          backgroundColor: tag.color
                        },
                        children: tag.label
                      }, i))
                    })]
                  })
                })]
              })
            })
          }), isLoggedIn && /* @__PURE__ */ jsx(FavoriteButton, {
            itemId: course.id,
            itemType: "course",
            isFavorited,
            onToggle: (newState) => handleFavoriteToggle(course.id, newState)
          })]
        }), /* @__PURE__ */ jsx("div", {
          id: anchorId,
          className: "accordion-collapse collapse",
          "data-bs-parent": "#accordionCourses",
          children: /* @__PURE__ */ jsx("div", {
            className: "accordion-body p-5",
            children: renderSummary(course.summary)
          })
        })]
      }, course.id);
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: courses_$tab,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const courses_$tab_$courseId = UNSAFE_withComponentProps(function Course() {
  return /* @__PURE__ */ jsxs("div", {
    className: "container d-flex flex-column gap-5 page-transition",
    children: [/* @__PURE__ */ jsx("img", {
      className: "img-fluid mt-3",
      src: "https://placehold.co/1920x420"
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "d-flex",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "display-4",
          children: "Course Title"
        }), /* @__PURE__ */ jsx("h3", {
          className: "text-secondary fw-light ms-auto",
          children: "Oct 2024"
        })]
      }), /* @__PURE__ */ jsx("h2", {
        className: "display-5 text-secondary",
        children: "Course tagline goes here"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "fs-4 fw-light d-flex flex-column gap-4",
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Section"
        }), /* @__PURE__ */ jsx("p", {
          children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto quaerat nobis cupiditate nulla eveniet? Numquam odio reprehenderit, reiciendis aperiam, voluptates harum dignissimos animi pariatur exercitationem laudantium libero nam qui!"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Section"
        }), /* @__PURE__ */ jsx("p", {
          children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto quaerat nobis cupiditate nulla eveniet? Numquam odio reprehenderit, reiciendis aperiam, voluptates harum dignissimos animi pariatur exercitationem laudantium libero nam qui!"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Section"
        }), /* @__PURE__ */ jsx("p", {
          children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto quaerat nobis cupiditate nulla eveniet? Numquam odio reprehenderit, reiciendis aperiam, voluptates harum dignissimos animi pariatur exercitationem laudantium libero nam qui!"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Section"
        }), /* @__PURE__ */ jsx("p", {
          children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto quaerat nobis cupiditate nulla eveniet? Numquam odio reprehenderit, reiciendis aperiam, voluptates harum dignissimos animi pariatur exercitationem laudantium libero nam qui!"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Section"
        }), /* @__PURE__ */ jsx("p", {
          children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto quaerat nobis cupiditate nulla eveniet? Numquam odio reprehenderit, reiciendis aperiam, voluptates harum dignissimos animi pariatur exercitationem laudantium libero nam qui!"
        })]
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: courses_$tab_$courseId
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  const response = await apiRequest("/blogs");
  const json = await response.json();
  return json;
}
const blog = UNSAFE_withComponentProps(function Blog() {
  const blogs = useLoaderData();
  const {
    isLoggedIn,
    user
  } = useAuth();
  const [savedBlogs, setSavedBlogs] = useState(user?.saved_blogs || []);
  const handleFavoriteToggle = (blogId, isFavorited) => {
    setSavedBlogs((prev) => isFavorited ? [...prev, blogId] : prev.filter((id) => id !== blogId));
  };
  return /* @__PURE__ */ jsx("div", {
    className: "container page-transition",
    children: /* @__PURE__ */ jsx("div", {
      className: "row justify-content-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-12 col-lg-8",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "my-4",
          children: "Blogs"
        }), /* @__PURE__ */ jsx("div", {
          className: "d-grid gap-3 tab-stagger",
          children: blogs.map(({
            id,
            title,
            author_name,
            publication_date,
            description,
            tags,
            image_url,
            image_alt
          }) => {
            const isFavorited = savedBlogs.includes(id);
            return /* @__PURE__ */ jsxs("div", {
              className: "position-relative",
              children: [isLoggedIn && /* @__PURE__ */ jsx(FavoriteButton, {
                itemId: id,
                itemType: "blog",
                isFavorited,
                onToggle: (newState) => handleFavoriteToggle(id, newState)
              }), /* @__PURE__ */ jsx(Link, {
                className: "card border-0 bg-dark-subtle text-decoration-none rounded-4 shadow d-block",
                to: `/blog/${id}`,
                children: /* @__PURE__ */ jsxs("div", {
                  className: "row g-0",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "col-auto",
                    children: /* @__PURE__ */ jsx("img", {
                      src: image_url || "https://placehold.co/400x300",
                      className: "img-fluid rounded-start-4",
                      style: {
                        width: "175px",
                        height: "175px",
                        objectFit: "cover"
                      },
                      alt: image_alt || title
                    })
                  }), /* @__PURE__ */ jsx("div", {
                    className: "col",
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between",
                      children: [/* @__PURE__ */ jsxs("div", {
                        className: "d-flex",
                        children: [/* @__PURE__ */ jsxs("div", {
                          className: "d-grid",
                          children: [/* @__PURE__ */ jsx("h5", {
                            className: "card-title mb-1",
                            children: title
                          }), /* @__PURE__ */ jsxs("h6", {
                            className: "",
                            children: [/* @__PURE__ */ jsx("span", {
                              className: "fw-light",
                              children: "Written by"
                            }), " ", author_name]
                          })]
                        }), /* @__PURE__ */ jsx("span", {
                          className: "ms-auto text-secondary",
                          children: new Date(publication_date).toLocaleDateString()
                        })]
                      }), /* @__PURE__ */ jsx("p", {
                        className: "card-text",
                        children: description
                      }), tags && tags.length > 0 && /* @__PURE__ */ jsx("div", {
                        className: "d-flex gap-1",
                        children: tags.map((tag, tagIndex) => /* @__PURE__ */ jsx("span", {
                          className: "badge text-capitalize",
                          style: {
                            backgroundColor: tag.color
                          },
                          children: tag.label
                        }, `${title}-${tag.label}-${tagIndex}`))
                      })]
                    })
                  })]
                })
              })]
            }, id);
          })
        })]
      })
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blog,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const blog_$blogId = UNSAFE_withComponentProps(function BlogPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "container d-flex flex-column gap-5 page-transition",
    children: [/* @__PURE__ */ jsx("img", {
      className: "img-fluid",
      src: "https://placehold.co/1920x420"
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsxs("h1", {
        className: "display-3 d-flex",
        children: ["Article Title", " ", /* @__PURE__ */ jsx("span", {
          className: "ms-auto fs-3 text-secondary",
          children: "12/10/2025"
        })]
      }), /* @__PURE__ */ jsx("h2", {
        className: "display-5",
        children: "Author Name"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "fs-4 fw-light d-flex flex-column gap-4",
      children: [/* @__PURE__ */ jsx("p", {
        children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam natus fugit eaque accusantium laborum, recusandae, mollitia assumenda deleniti ex dolore nulla consequuntur distinctio suscipit inventore rerum libero fugiat magnam tenetur? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, deleniti quos reprehenderit molestiae saepe tempora quasi expedita aut odio eius quibusdam, aperiam ipsum iste. Veritatis vitae commodi ea possimus nulla."
      }), /* @__PURE__ */ jsx("p", {
        children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam natus fugit eaque accusantium laborum, recusandae, mollitia assumenda deleniti ex dolore nulla consequuntur distinctio suscipit inventore rerum libero fugiat magnam tenetur? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, deleniti quos reprehenderit molestiae saepe tempora quasi expedita aut odio eius quibusdam, aperiam ipsum iste. Veritatis vitae commodi ea possimus nulla."
      }), /* @__PURE__ */ jsx("p", {
        children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam natus fugit eaque accusantium laborum, recusandae, mollitia assumenda deleniti ex dolore nulla consequuntur distinctio suscipit inventore rerum libero fugiat magnam tenetur? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, deleniti quos reprehenderit molestiae saepe tempora quasi expedita aut odio eius quibusdam, aperiam ipsum iste. Veritatis vitae commodi ea possimus nulla."
      })]
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blog_$blogId
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    className: "container d-flex flex-column gap-5 page-transition pt-3",
    children: [/* @__PURE__ */ jsx("img", {
      src: "https://placehold.co/1920x420",
      className: "img-fluid"
    }), /* @__PURE__ */ jsx("h1", {
      className: "display-4",
      children: "About Us"
    }), /* @__PURE__ */ jsx("p", {
      className: "fs-4 fw-light d-flex flex-column gap-4",
      children: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, soluta unde fuga laboriosam nam consequatur ducimus molestiae explicabo harum inventore nesciunt adipisci eaque eligendi, iste, non a eveniet repellat nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum accusamus necessitatibus, nam molestiae dignissimos ipsam delectus dolore dolor quibusdam provident omnis, iure hic incidunt a dolorem laboriosam. Veritatis, repellat architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis debitis ipsa vitae recusandae, error delectus nulla fugit dolorem, maxime fuga expedita dolor ut est nemo. Quia earum sunt esse doloribus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae facere numquam accusamus. Recusandae nobis quibusdam a, labore voluptas illo molestiae dolore omnis, voluptatibus id iure dicta possimus voluptates ex totam."
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const contact = UNSAFE_withComponentProps(function Contact() {
  const [values, setValues] = useState({
    email: "",
    messages: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues((v) => ({
      ...v,
      [e.target.name]: e.target.value
    }));
    if (error) setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    if (!values.email || !values.messages) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }
    if (!values.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await apiRequest("/contacts", {
        method: "POST",
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message");
      }
      setSuccess(true);
      setValues({
        email: "",
        messages: ""
      });
      setTimeout(() => {
        navigate("/");
      }, 2e3);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "container align-self-center page-transition",
    children: /* @__PURE__ */ jsx("div", {
      className: "row justify-content-center",
      children: /* @__PURE__ */ jsx("div", {
        className: "col-12 col-md- col-lg-6",
        children: /* @__PURE__ */ jsxs("form", {
          className: "card border-0 bg-dark-subtle p-4 rounded-4",
          onSubmit: handleSubmit,
          children: [/* @__PURE__ */ jsxs("div", {
            className: "card-header border-0 bg-transparent",
            children: [/* @__PURE__ */ jsx("p", {
              className: "display-5",
              children: "Contact Us"
            }), /* @__PURE__ */ jsx("p", {
              className: "fs-5 mb-0",
              children: "We appreciate your feedback!"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "card-body",
            children: [error && /* @__PURE__ */ jsx("div", {
              className: "alert alert-danger animate-shake",
              role: "alert",
              children: error
            }), success && /* @__PURE__ */ jsx("div", {
              className: "alert alert-success animate-fade-in",
              role: "alert",
              children: "Thank you! Your message has been sent successfully. Redirecting..."
            }), /* @__PURE__ */ jsxs("div", {
              className: "form-floating mb-3",
              children: [/* @__PURE__ */ jsx("input", {
                type: "email",
                className: "form-control",
                id: "floatingInput",
                name: "email",
                placeholder: "name@example.com",
                value: values.email,
                onChange: handleChange,
                required: true,
                disabled: isSubmitting || success
              }), /* @__PURE__ */ jsx("label", {
                htmlFor: "floatingInput",
                children: "Email Address"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "form-floating",
              children: [/* @__PURE__ */ jsx("textarea", {
                className: "form-control",
                placeholder: "Enter your message here",
                id: "floatingTextarea",
                name: "messages",
                style: {
                  height: "6rem"
                },
                value: values.messages,
                onChange: handleChange,
                required: true,
                disabled: isSubmitting || success
              }), /* @__PURE__ */ jsx("label", {
                htmlFor: "floatingTextarea",
                children: "Message"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "card-footer border-0 bg-transparent text-end pt-0",
            children: [/* @__PURE__ */ jsx(Link, {
              className: "btn btn-danger me-2",
              to: "/",
              children: "Cancel"
            }), /* @__PURE__ */ jsx("button", {
              className: "btn btn-success",
              type: "submit",
              disabled: isSubmitting || success,
              children: isSubmitting ? "Submitting..." : "Submit"
            })]
          })]
        })
      })
    })
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
const login = UNSAFE_withComponentProps(function Login() {
  const [signupMode, setSignupMode] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    login: login2,
    isLoggedIn
  } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/logout", {
        replace: true
      });
    }
  }, [isLoggedIn, navigate]);
  const toggleSignup = () => {
    setSignupMode((e) => !e);
    setError(null);
  };
  const handleChange = (e) => {
    setValues((v) => ({
      ...v,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (signupMode) {
      if (!values.username || !values.email || !values.password || !values.retypePassword) {
        setError("All fields are required");
        return;
      }
      if (values.password !== values.retypePassword) {
        setError("Passwords do not match");
        return;
      }
      if (values.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }
    const endpoint = signupMode ? "/signup" : "/login";
    const body = signupMode ? {
      username: values.username,
      email: values.email,
      password: values.password
    } : {
      email: values.email,
      password: values.password
    };
    try {
      const res = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || (signupMode ? "Signup failed" : "Login failed"));
        return;
      }
      login2(json.token, json.user);
      await new Promise((resolve) => setTimeout(resolve, 100));
      navigate("/", {
        replace: true
      });
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "container align-self-center page-transition",
    children: /* @__PURE__ */ jsx("div", {
      className: "row justify-content-center",
      children: /* @__PURE__ */ jsx("div", {
        className: "col-12 col-md- col-lg-6",
        children: /* @__PURE__ */ jsxs(Form, {
          className: "card border-0 bg-dark-subtle p-4 rounded-4",
          onSubmit: handleSubmit,
          children: [/* @__PURE__ */ jsxs("div", {
            className: "card-header border-0 bg-transparent",
            children: [/* @__PURE__ */ jsx("p", {
              className: "display-5 mb-3",
              children: signupMode ? "Sign Up" : "Login"
            }), /* @__PURE__ */ jsx("p", {
              className: "fs-5 my-0",
              children: signupMode ? "Please enter a unique email and strong password" : "Please login or sign up to access your dashboard"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "card-body",
            children: [error && /* @__PURE__ */ jsx("div", {
              className: "alert alert-danger",
              children: error
            }), signupMode && /* @__PURE__ */ jsxs("div", {
              className: "form-floating mb-3",
              children: [/* @__PURE__ */ jsx("input", {
                type: "text",
                className: "form-control",
                id: "floatingUsername",
                name: "username",
                placeholder: "Username",
                value: values.username,
                onChange: handleChange,
                required: true
              }), /* @__PURE__ */ jsx("label", {
                htmlFor: "floatingUsername",
                children: "Username"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "form-floating mb-3",
              children: [/* @__PURE__ */ jsx("input", {
                type: "email",
                className: "form-control",
                id: "floatingInput",
                name: "email",
                placeholder: "name@example.com",
                value: values.email,
                onChange: handleChange,
                required: true
              }), /* @__PURE__ */ jsx("label", {
                htmlFor: "floatingInput",
                children: "Email Address"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "form-floating mb-3",
              children: [/* @__PURE__ */ jsx("input", {
                type: "password",
                className: "form-control",
                id: "floatingPassword",
                name: "password",
                placeholder: "Password",
                value: values.password,
                onChange: handleChange,
                required: true
              }), /* @__PURE__ */ jsx("label", {
                htmlFor: "floatingPassword",
                children: "Password"
              })]
            }), signupMode && /* @__PURE__ */ jsxs("div", {
              className: "form-floating mb-3",
              children: [/* @__PURE__ */ jsx("input", {
                type: "password",
                className: "form-control",
                id: "floatingRetypePassword",
                name: "retypePassword",
                placeholder: "Retype Password",
                value: values.retypePassword,
                onChange: handleChange,
                required: true
              }), /* @__PURE__ */ jsx("label", {
                htmlFor: "floatingRetypePassword",
                children: "Retype Password"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "card-footer border-0 bg-transparent p-0 d-flex align-items-center",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/forgot-password",
                children: "Forgot Password"
              }), /* @__PURE__ */ jsx("button", {
                className: `ms-auto btn btn-${signupMode ? "danger" : "primary"}`,
                type: "button",
                onClick: toggleSignup,
                children: signupMode ? "Cancel" : "Sign Up"
              }), /* @__PURE__ */ jsx("button", {
                className: "btn btn-success ms-2",
                type: "submit",
                children: signupMode ? "Submit" : "Login"
              })]
            })]
          })]
        })
      })
    })
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
function ActionModal({
  id,
  title,
  children,
  confirmText = "Confirm",
  confirmVariant = "success",
  onConfirm
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "modal fade",
      id,
      tabIndex: "-1",
      "aria-labelledby": id + "Label",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs("div", { className: "modal-content border-0 bg-dark-subtle rounded-4 p-4 pb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "modal-header border-0 bg-transparent pt-0", children: [
          /* @__PURE__ */ jsx(
            "h5",
            {
              className: "modal-title fs-4",
              id: id + "Label",
              children: title
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "modal-body bg-secondary-subtle rounded-4 p-4 mb-2", children }),
        /* @__PURE__ */ jsxs("div", { className: "modal-footer border-0 bg-transparent p-0", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "btn btn-secondary me-2",
              "data-bs-dismiss": "modal",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: `btn btn-${confirmVariant} m-0`,
              onClick: onConfirm,
              "data-bs-dismiss": "modal",
              children: confirmText
            }
          )
        ] })
      ] }) })
    }
  );
}
function ProfilePictureUpload({ user, onUpdate }) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/webp"
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image file (PNG, JPG, GIF, or WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
    handleUpload(file);
  };
  const handleUpload = async (file) => {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const data = await apiUpload(`/upload/profile-picture/${user.id}`, formData);
      const updatedUser = data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (onUpdate) onUpdate(updatedUser);
      setPreviewUrl(null);
    } catch (err) {
      setError(err.message || "Failed to upload image");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };
  const confirmDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const response = await apiRequest(
        `/upload/profile-picture/${user.id}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed");
      const updatedUser = data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (onUpdate) onUpdate(updatedUser);
    } catch (err) {
      setError(err.message || "Failed to delete image");
    } finally {
      setDeleting(false);
    }
  };
  const triggerFileInput = () => fileInputRef.current?.click();
  const handleConfirmUpload = () => triggerFileInput();
  const currentPicture = previewUrl || (user?.profile_picture ? `${API_BASE_URL}${user.profile_picture}` : null);
  const hasPhoto = Boolean(user?.profile_picture || previewUrl);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "d-flex flex-column align-items-center gap-3", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "position-relative rounded-circle overflow-hidden border",
          style: { width: 200, height: 200 },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: currentPicture || "https://placehold.co/200?text=No+Photo",
                alt: "User profile",
                className: "w-100 h-100",
                style: {
                  opacity: uploading || deleting ? 0.5 : 1,
                  transition: "opacity 0.2s ease"
                }
              }
            ),
            (uploading || deleting) && /* @__PURE__ */ jsx("div", { className: "position-absolute top-50 start-50 translate-middle", children: /* @__PURE__ */ jsx(
              FontAwesomeIcon,
              {
                icon: faSpinner,
                spin: true,
                className: "fs-1 text-primary"
              }
            ) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/png,image/jpeg,image/jpg,image/gif,image/webp",
                onChange: handleFileSelect,
                className: "d-none"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "position-absolute bottom-0 start-0 w-100 d-flex justify-content-center align-items-center gap-3 bg-dark bg-opacity-75 py-1", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "bg-transparent border-0 p-0 text-white",
                  title: hasPhoto ? "Change photo" : "Add photo",
                  "data-bs-toggle": "modal",
                  "data-bs-target": "#profilePictureActionModal",
                  onClick: () => setActiveModal("upload"),
                  disabled: uploading || deleting,
                  children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: hasPhoto ? faRefresh : faPlus })
                }
              ),
              hasPhoto && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "bg-transparent border-0 p-0 text-danger",
                  title: "Delete photo",
                  "data-bs-toggle": "modal",
                  "data-bs-target": "#profilePictureActionModal",
                  onClick: () => setActiveModal("delete"),
                  disabled: uploading || deleting,
                  children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faTrash })
                }
              )
            ] })
          ]
        }
      ),
      error && /* @__PURE__ */ jsx("div", { className: "alert alert-danger mb-0 w-100 text-center", children: error })
    ] }),
    /* @__PURE__ */ jsx(
      ActionModal,
      {
        id: "profilePictureActionModal",
        title: activeModal === "delete" ? "Delete Profile Picture" : "Upload Profile Picture",
        confirmText: activeModal === "delete" ? "Delete" : "Confirm",
        confirmVariant: activeModal === "delete" ? "danger" : "success",
        onConfirm: activeModal === "delete" ? confirmDelete : handleConfirmUpload,
        children: activeModal === "delete" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "fs-5 mb-1", children: "Are you sure you want to delete your profile picture?" }),
          /* @__PURE__ */ jsx("p", { className: "mb-0", children: "This action cannot be undone. You can upload a new one later." })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "fs-5 mb-1", children: "Please select an image that meets the following requirements:" }),
          /* @__PURE__ */ jsxs("ul", { className: "mb-0", children: [
            /* @__PURE__ */ jsx("li", { children: "Formats: PNG, JPG, JPEG, GIF, WebP" }),
            /* @__PURE__ */ jsx("li", { children: "Maximum size: 5MB" }),
            /* @__PURE__ */ jsx("li", { children: "Square / centered images look best" })
          ] })
        ] })
      }
    )
  ] });
}
function DeleteSavedItemButton({
  itemId,
  itemType,
  // 'course' | 'blog'
  onRemove
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, login: login2 } = useAuth();
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    setIsLoading(true);
    try {
      const endpoint = itemType === "course" ? `/users/${user.id}/favourite-courses/${itemId}` : `/users/${user.id}/saved-blogs/${itemId}`;
      const response = await apiRequest(endpoint, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
      const updatedUser = await response.json();
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        login2(token, updatedUser);
      }
      if (onRemove) {
        onRemove(itemId);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "btn btn-sm btn-danger position-absolute bottom-0 start-0 m-2 z-3 border-0",
      onClick: handleClick,
      disabled: isLoading,
      title: "Remove from list",
      style: {
        opacity: isLoading ? 0.6 : 1,
        transition: "all 0.2s ease",
        borderRadius: "12px"
      },
      children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faTrash })
    }
  );
}
async function clientLoader() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user.id) {
    return {
      ownedCourses: [],
      favouriteCourses: [],
      savedBlogs: []
    };
  }
  try {
    const response = await apiRequest(`/users/${user.id}?expand=true`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();
    return {
      ownedCourses: userData.owned_courses || [],
      favouriteCourses: userData.favourite_courses || [],
      savedBlogs: userData.saved_blogs || []
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      ownedCourses: [],
      favouriteCourses: [],
      savedBlogs: []
    };
  }
}
clientLoader.hydrate = true;
const profile = UNSAFE_withComponentProps(function Profile() {
  const {
    user,
    logout: logout2,
    login: login2
  } = useAuth();
  const navigate = useNavigate();
  const {
    ownedCourses,
    favouriteCourses,
    savedBlogs
  } = useLoaderData();
  const revalidator = useRevalidator();
  const [favCoursesState, setFavCoursesState] = useState(favouriteCourses);
  const [savedBlogsState, setSavedBlogsState] = useState(savedBlogs);
  const handleLogout = () => {
    logout2();
    navigate("/");
  };
  const handleProfilePictureUpdate = (updatedUser) => {
    const token = localStorage.getItem("token");
    if (token) {
      login2(token, updatedUser);
    }
    revalidator.revalidate();
  };
  const sections = [{
    id: "collapseOne",
    title: "Owned Courses",
    badgeColor: "success",
    count: ownedCourses.length,
    items: ownedCourses.map((course) => ({
      id: course.id,
      title: course.name,
      description: course.description,
      linkPath: `/courses/${course.topic}/${course.id}`,
      imgUrl: course.image_url || "https://placehold.co/175",
      imgAlt: course.image_alt || course.name,
      tags: course.tags || [],
      removable: false,
      // owned, so no trash
      type: "course"
    }))
  }, {
    id: "collapseTwo",
    title: "Favourited Courses",
    badgeColor: "primary",
    count: favCoursesState.length,
    items: favCoursesState.map((course) => ({
      id: course.id,
      title: course.name,
      description: course.description,
      linkPath: `/courses/${course.topic}/${course.id}`,
      imgUrl: course.image_url || "https://placehold.co/175",
      imgAlt: course.image_alt || course.name,
      tags: course.tags || [],
      removable: true,
      type: "course"
    }))
  }, {
    id: "collapseThree",
    title: "Saved Blogs",
    badgeColor: "warning",
    count: savedBlogsState.length,
    items: savedBlogsState.map((blog2) => ({
      id: blog2.id,
      title: blog2.title,
      description: blog2.description,
      linkPath: `/blog/${blog2.id}`,
      imgUrl: blog2.image_url || "https://placehold.co/400x300",
      imgAlt: blog2.image_alt || blog2.title,
      tags: blog2.tags || [],
      removable: true,
      type: "blog"
    }))
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "container page-transition",
    children: [/* @__PURE__ */ jsx("style", {
      children: `
        .accordion-item:last-child .accordion-button.collapsed {
          border-radius: 0 0 1.5rem 1.5rem !important;
        }
        .accordion-item:last-child:has(.accordion-collapse.show) {
          border-radius: 0 !important;
        }
        .accordion-item:last-child .accordion-body {
          border-radius: 0 0 1.5rem 1.5rem;
        }
      `
    }), /* @__PURE__ */ jsx("div", {
      className: "row justify-content-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-12 col-lg-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "d-flex bg-dark-subtle p-4 rounded-4 mt-4 mb-5 shadow position-relative",
          children: [/* @__PURE__ */ jsx("button", {
            className: "btn btn-secondary position-absolute top-0 end-0 m-3",
            onClick: handleLogout,
            children: "Logout"
          }), /* @__PURE__ */ jsxs("div", {
            className: "row g-4 justify-content-center justify-content-md-start w-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "col-12 col-md-auto d-flex justify-content-center",
              children: /* @__PURE__ */ jsx(ProfilePictureUpload, {
                user,
                onUpdate: handleProfilePictureUpdate
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-12 col-md",
              children: /* @__PURE__ */ jsxs("div", {
                className: "d-flex flex-column justify-content-center align-items-center align-items-md-start h-100",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-capitalize",
                  children: user?.username || "User Name"
                }), /* @__PURE__ */ jsx("h4", {
                  children: user?.email || "email@address.com"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-secondary fs-5 m-0",
                  children: user?.created_at ? `Joined on ${new Date(user.created_at).toLocaleDateString()}` : "Joined on 10/12/2024"
                })]
              })
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "accordion rounded-4 shadow",
          id: "accordionExample",
          children: sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs("div", {
            className: `accordion-item bg-dark-subtle border-0 ${sectionIndex === 0 ? "rounded-top-4" : sectionIndex === 2 ? "rounded-bottom-4" : ""}`,
            children: [/* @__PURE__ */ jsx("h2", {
              className: "accordion-header",
              children: /* @__PURE__ */ jsxs("button", {
                className: `accordion-button bg-dark-subtle fs-4 collapsed border-0 ${sectionIndex === 0 ? "rounded-top-4" : ""}`,
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": `#${section.id}`,
                "aria-expanded": sectionIndex === 0 ? "true" : "false",
                "aria-controls": section.id,
                children: [/* @__PURE__ */ jsx("span", {
                  className: `badge text-bg-${section.badgeColor} me-3`,
                  children: section.count
                }), section.title]
              })
            }), /* @__PURE__ */ jsx("div", {
              id: section.id,
              className: "accordion-collapse collapse",
              "data-bs-parent": "#accordionExample",
              children: /* @__PURE__ */ jsx("div", {
                className: "accordion-body p-4",
                children: section.items.length === 0 ? /* @__PURE__ */ jsx("div", {
                  className: "text-center py-5",
                  children: /* @__PURE__ */ jsxs("p", {
                    className: "text-muted fs-5",
                    children: ["No ", section.title.toLowerCase(), " yet"]
                  })
                }) : /* @__PURE__ */ jsx("div", {
                  className: "row row-cols-1 g-3",
                  children: section.items.map((item) => /* @__PURE__ */ jsx("div", {
                    className: "col",
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "position-relative",
                      children: [/* @__PURE__ */ jsx(Link, {
                        className: "card border-0 bg-secondary-subtle text-decoration-none rounded-4 shadow",
                        to: item.linkPath,
                        children: /* @__PURE__ */ jsxs("div", {
                          className: "row g-0",
                          children: [/* @__PURE__ */ jsx("div", {
                            className: "col-auto",
                            children: /* @__PURE__ */ jsx("img", {
                              src: item.imgUrl,
                              className: "img-fluid rounded-start-4",
                              style: {
                                width: "175px",
                                height: "175px",
                                objectFit: "cover"
                              },
                              alt: item.imgAlt
                            })
                          }), /* @__PURE__ */ jsx("div", {
                            className: "col",
                            children: /* @__PURE__ */ jsxs("div", {
                              className: "card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between",
                              children: [/* @__PURE__ */ jsx("h5", {
                                className: "card-title",
                                children: item.title
                              }), /* @__PURE__ */ jsx("p", {
                                className: "card-text m-0",
                                children: item.description
                              }), item.tags && item.tags.length > 0 && /* @__PURE__ */ jsx("div", {
                                className: "d-flex gap-1 mt-2",
                                children: item.tags.map((tag, tagIndex) => /* @__PURE__ */ jsx("span", {
                                  className: "badge text-capitalize",
                                  style: {
                                    backgroundColor: tag.color
                                  },
                                  children: tag.label
                                }, `${item.title}-${tag.label}-${tagIndex}`))
                              })]
                            })
                          })]
                        })
                      }), item.removable && item.type === "course" && /* @__PURE__ */ jsx(DeleteSavedItemButton, {
                        itemId: item.id,
                        itemType: "course",
                        onRemove: (id) => setFavCoursesState((prev) => prev.filter((c) => c.id !== id))
                      }), item.removable && item.type === "blog" && /* @__PURE__ */ jsx(DeleteSavedItemButton, {
                        itemId: item.id,
                        itemType: "blog",
                        onRemove: (id) => setSavedBlogsState((prev) => prev.filter((b) => b.id !== id))
                      })]
                    })
                  }, item.id))
                })
              })
            })]
          }, section.id))
        })]
      })
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader,
  default: profile
}, Symbol.toStringTag, { value: "Module" }));
const logout = UNSAFE_withComponentProps(function Logout() {
  const {
    logout: logout2
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout2();
    navigate("/");
  };
  return /* @__PURE__ */ jsx("div", {
    className: "container align-self-center page-transition",
    children: /* @__PURE__ */ jsx("div", {
      className: "row justify-content-center",
      children: /* @__PURE__ */ jsx("div", {
        className: "col-12 col-md- col-lg-6",
        children: /* @__PURE__ */ jsx("div", {
          className: "card border-0 bg-dark-subtle p-4 rounded-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "card-body text-center",
            children: [/* @__PURE__ */ jsx("p", {
              className: "display-5 mb-4",
              children: "Would you like to logout?"
            }), /* @__PURE__ */ jsxs("div", {
              className: "d-flex gap-3 justify-content-center",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "btn btn-primary btn-lg px-5",
                children: "Home"
              }), /* @__PURE__ */ jsx("button", {
                className: "btn btn-danger btn-lg px-5",
                onClick: handleLogout,
                children: "Logout"
              })]
            })]
          })
        })
      })
    })
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: logout
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BI6GDBUD.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-AqPrx7MY.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/index-D2MXpevW.js", "/assets/AuthContext-D4lhteYI.js", "/assets/api-8LSux9jW.js"], "css": ["/assets/root-BQDarExI.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-CVHYtjtV.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/index-D2MXpevW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/courses": { "id": "routes/courses", "parentId": "root", "path": "/courses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/courses-Ca-0xz8p.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/courses.$tab": { "id": "routes/courses.$tab", "parentId": "routes/courses", "path": ":tab", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/courses._tab-BFwv9oUg.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/AuthContext-D4lhteYI.js", "/assets/FavoriteButton-Cz6N0478.js", "/assets/index-D2MXpevW.js", "/assets/api-8LSux9jW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/courses.$tab.$courseId": { "id": "routes/courses.$tab.$courseId", "parentId": "root", "path": "/courses/:tab/:courseId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/courses._tab._courseId-CfkuBKVB.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog": { "id": "routes/blog", "parentId": "root", "path": "/blog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog-DVKFqlJ7.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/AuthContext-D4lhteYI.js", "/assets/FavoriteButton-Cz6N0478.js", "/assets/index-D2MXpevW.js", "/assets/api-8LSux9jW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog.$blogId": { "id": "routes/blog.$blogId", "parentId": "root", "path": "/blog/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog._blogId-BzgSLhA-.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "/about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-D0dxE2XL.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "/contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-CCuecXoV.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/api-8LSux9jW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "/login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-BB3ShLDJ.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/AuthContext-D4lhteYI.js", "/assets/api-8LSux9jW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile": { "id": "routes/profile", "parentId": "root", "path": "/profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-BlPZsxPe.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/AuthContext-D4lhteYI.js", "/assets/index-D2MXpevW.js", "/assets/api-8LSux9jW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "/logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/logout-XQ1RIsA5.js", "imports": ["/assets/chunk-PVWAREVJ-gVtuFcjs.js", "/assets/AuthContext-D4lhteYI.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-05c0a645.js", "version": "05c0a645", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/courses": {
    id: "routes/courses",
    parentId: "root",
    path: "/courses",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/courses.$tab": {
    id: "routes/courses.$tab",
    parentId: "routes/courses",
    path: ":tab",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/courses.$tab.$courseId": {
    id: "routes/courses.$tab.$courseId",
    parentId: "root",
    path: "/courses/:tab/:courseId",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "/blog",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/blog.$blogId": {
    id: "routes/blog.$blogId",
    parentId: "root",
    path: "/blog/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "/about",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "/contact",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "/login",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "/profile",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "/logout",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
