(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Onboarding.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Onboarding",
    ()=>Onboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const ROLES = [
    {
        id: "investor",
        label: "Investor",
        icon: "📈",
        desc: "Portfolio & market alpha"
    },
    {
        id: "founder",
        label: "Founder",
        icon: "🚀",
        desc: "Funding & competitor moves"
    },
    {
        id: "student",
        label: "Student",
        icon: "🎓",
        desc: "Explainers & background"
    },
    {
        id: "executive",
        label: "Executive",
        icon: "🏢",
        desc: "Strategy & policy impact"
    },
    {
        id: "journalist",
        label: "Journalist",
        icon: "📰",
        desc: "Sources & fact context"
    },
    {
        id: "policy",
        label: "Policy Maker",
        icon: "🏛",
        desc: "Regulation & macro"
    }
];
const INTERESTS = [
    "Equity Markets",
    "Crypto & Web3",
    "Startups & VC",
    "Monetary Policy",
    "Real Estate",
    "Technology",
    "Energy & ESG",
    "Global Trade",
    "Banking & Finance",
    "Healthcare",
    "Infrastructure",
    "Geopolitics"
];
const AGE_GROUPS = [
    {
        id: "18-24",
        label: "18–24"
    },
    {
        id: "25-34",
        label: "25–34"
    },
    {
        id: "35-49",
        label: "35–49"
    },
    {
        id: "50+",
        label: "50+"
    }
];
function Onboarding({ onComplete }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [age, setAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [interests, setInterests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [portfolio, setPortfolio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Reliance Industries, Nifty 50, Infosys");
    const toggleInterest = (i)=>{
        setInterests((prev)=>prev.includes(i) ? prev.filter((x)=>x !== i) : prev.length < 5 ? [
                ...prev,
                i
            ] : prev);
    };
    const handleFinish = ()=>{
        onComplete({
            role,
            age,
            interests,
            portfolio: portfolio.split(",").map((s)=>s.trim()).filter(Boolean)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "var(--bg-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: 560
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: "center",
                        marginBottom: "2.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "1.6rem",
                                fontWeight: 700,
                                color: "var(--text-primary)"
                            },
                            children: [
                                "ET News",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--accent)"
                                    },
                                    children: "Flow"
                                }, void 0, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 71,
                                    columnNumber: 20
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "var(--font-serif)",
                                fontSize: "0.9rem",
                                color: "var(--text-muted)",
                                marginTop: 6
                            },
                            children: "Personalise your intelligence feed"
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Onboarding.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 4,
                        marginBottom: "2rem"
                    },
                    children: [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                height: 3,
                                borderRadius: 2,
                                background: i <= step ? "var(--accent)" : "var(--border-strong)",
                                transition: "background 0.3s"
                            }
                        }, i, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Onboarding.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "1.3rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                marginBottom: 6
                            },
                            children: "What best describes you?"
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.82rem",
                                color: "var(--text-muted)",
                                marginBottom: "1.5rem"
                            },
                            children: "We'll tailor every briefing to your perspective."
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 10
                            },
                            children: ROLES.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setRole(r.id),
                                    style: {
                                        padding: "1rem",
                                        borderRadius: 12,
                                        cursor: "pointer",
                                        background: role === r.id ? "var(--accent-dim)" : "var(--bg-secondary)",
                                        border: role === r.id ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                                        textAlign: "left",
                                        transition: "all 0.15s"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "1.4rem",
                                                marginBottom: 6
                                            },
                                            children: r.icon
                                        }, void 0, false, {
                                            fileName: "[project]/components/Onboarding.tsx",
                                            lineNumber: 110,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.85rem",
                                                fontWeight: 600,
                                                color: role === r.id ? "var(--accent)" : "var(--text-primary)"
                                            },
                                            children: r.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/Onboarding.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.72rem",
                                                color: "var(--text-muted)",
                                                marginTop: 2
                                            },
                                            children: r.desc
                                        }, void 0, false, {
                                            fileName: "[project]/components/Onboarding.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setStep(1),
                            disabled: !role,
                            style: nextBtnStyle(!role),
                            children: "Continue →"
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Onboarding.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this),
                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: headingStyle,
                            children: "How old are you?"
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: subStyle,
                            children: "Helps us calibrate complexity and context depth."
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10,
                                flexWrap: "wrap",
                                marginBottom: "2rem"
                            },
                            children: AGE_GROUPS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setAge(a.id),
                                    style: {
                                        padding: "0.65rem 1.5rem",
                                        borderRadius: 24,
                                        cursor: "pointer",
                                        background: age === a.id ? "var(--accent)" : "var(--bg-secondary)",
                                        border: age === a.id ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                                        color: age === a.id ? "white" : "var(--text-secondary)",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                        transition: "all 0.15s"
                                    },
                                    children: a.label
                                }, a.id, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStep(0),
                                    style: backBtnStyle,
                                    children: "← Back"
                                }, void 0, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStep(2),
                                    disabled: !age,
                                    style: nextBtnStyle(!age),
                                    children: "Continue →"
                                }, void 0, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Onboarding.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this),
                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: headingStyle,
                            children: "Pick up to 5 topics"
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: subStyle,
                            children: "Your feed will prioritise these areas."
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                                marginBottom: "2rem"
                            },
                            children: INTERESTS.map((i)=>{
                                const sel = interests.includes(i);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>toggleInterest(i),
                                    style: {
                                        padding: "0.45rem 1rem",
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        background: sel ? "var(--accent-dim)" : "transparent",
                                        border: sel ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                                        color: sel ? "var(--accent)" : "var(--text-muted)",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.78rem",
                                        fontWeight: 500,
                                        transition: "all 0.15s"
                                    },
                                    children: i
                                }, i, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 167,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.72rem",
                                color: "var(--text-muted)",
                                marginBottom: "1rem"
                            },
                            children: [
                                interests.length,
                                "/5 selected"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStep(1),
                                    style: backBtnStyle,
                                    children: "← Back"
                                }, void 0, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStep(3),
                                    disabled: interests.length === 0,
                                    style: nextBtnStyle(interests.length === 0),
                                    children: "Continue →"
                                }, void 0, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Onboarding.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: headingStyle,
                            children: "Your portfolio holdings"
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 198,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: subStyle,
                            children: "We'll generate personalised alpha signals for these. Separate by comma."
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: portfolio,
                            onChange: (e)=>setPortfolio(e.target.value),
                            rows: 3,
                            placeholder: "e.g. Reliance Industries, Nifty 50, HDFC Bank, Infosys",
                            style: {
                                width: "100%",
                                padding: "0.85rem 1rem",
                                borderRadius: 10,
                                background: "var(--bg-secondary)",
                                border: "1px solid var(--border-strong)",
                                color: "var(--text-primary)",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.85rem",
                                resize: "none",
                                outline: "none",
                                marginBottom: "0.75rem",
                                lineHeight: 1.6
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.72rem",
                                color: "var(--text-muted)",
                                marginBottom: "1.5rem"
                            },
                            children: "Leave blank if not applicable — you can edit this later."
                        }, void 0, false, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStep(2),
                                    style: backBtnStyle,
                                    children: "← Back"
                                }, void 0, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleFinish,
                                    style: nextBtnStyle(false),
                                    children: "Start My Feed →"
                                }, void 0, false, {
                                    fileName: "[project]/components/Onboarding.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Onboarding.tsx",
                            lineNumber: 219,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Onboarding.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Onboarding.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Onboarding.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(Onboarding, "KtGBa1SIgPsmOIEym57J9I9/US8=");
_c = Onboarding;
const headingStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 6
};
const subStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: "0.82rem",
    color: "var(--text-muted)",
    marginBottom: "1.5rem"
};
const nextBtnStyle = (disabled)=>({
        flex: 1,
        padding: "0.75rem 1.5rem",
        borderRadius: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        background: disabled ? "var(--bg-tertiary)" : "var(--accent)",
        border: "none",
        color: disabled ? "var(--text-muted)" : "white",
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        fontWeight: 600,
        transition: "all 0.15s",
        opacity: disabled ? 0.5 : 1,
        marginTop: "0.5rem"
    });
const backBtnStyle = {
    padding: "0.75rem 1.25rem",
    borderRadius: 10,
    cursor: "pointer",
    background: "transparent",
    border: "1px solid var(--border-strong)",
    color: "var(--text-muted)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.85rem",
    fontWeight: 500,
    transition: "all 0.15s"
};
var _c;
__turbopack_context__.k.register(_c, "Onboarding");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useUserProfile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserProfile",
    ()=>useUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const STORAGE_KEY = "et_newsflow_profile";
function useUserProfile() {
    _s();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUserProfile.useEffect": ()=>{
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) setProfile(JSON.parse(saved));
            } catch  {}
            setLoaded(true);
        }
    }["useUserProfile.useEffect"], []);
    const saveProfile = (p)=>{
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
        } catch  {}
        setProfile(p);
    };
    const clearProfile = ()=>{
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch  {}
        setProfile(null);
    };
    return {
        profile,
        saveProfile,
        clearProfile,
        loaded
    };
}
_s(useUserProfile, "sC5V1Wri4Rx0iSGM0uuiQIC76NQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/NewsNavigator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsNavigator",
    ()=>NewsNavigator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MasterBriefing({ content }) {
    const sections = content.split(/(?=## )/g).filter(Boolean);
    if (sections.length <= 1) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            style: {
                fontFamily: "var(--font-serif)",
                fontSize: "0.85rem",
                lineHeight: 1.75,
                color: "var(--text-secondary)"
            },
            children: content.replace(/^#+\s*/gm, "")
        }, void 0, false, {
            fileName: "[project]/components/NewsNavigator.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
        },
        children: sections.map((s, i)=>{
            const lines = s.split("\n");
            const heading = lines[0].replace(/^#+\s*/, "").trim();
            const body = lines.slice(1).join("\n").trim();
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderLeft: "2px solid var(--accent)",
                    paddingLeft: "0.85rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            marginBottom: 5
                        },
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-serif)",
                            fontSize: "0.85rem",
                            lineHeight: 1.75,
                            color: "var(--text-secondary)"
                        },
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 44,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/components/NewsNavigator.tsx",
                lineNumber: 37,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/NewsNavigator.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = MasterBriefing;
function NewsNavigator({ profile, onFollowup }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const search = async (q)=>{
        if (!q.trim() || loading) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch("http://localhost:8000/navigator/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: q,
                    profile
                })
            });
            if (!res.ok) throw new Error("Search failed");
            const data = await res.json();
            // ✅ If we got a job_id, go to the full dashboard
            if (data.job_id) {
                router.push(`/dashboard/${data.job_id}`);
                return;
            }
            // Fallback: render inline if no job_id
            setResult(data);
        } catch (e) {
            setResult({
                query: q,
                status: "error",
                master_briefing: "Search unavailable. Please try generating a briefing instead.",
                followup_questions: [],
                angles_researched: [],
                headlines_used: []
            });
        } finally{
            setLoading(false);
        }
    };
    const handleKey = (e)=>{
        if (e.key === "Enter") {
            search(query);
            setQuery("");
        }
    };
    const handleFollowup = (q)=>{
        setQuery(q);
        search(q);
        onFollowup?.(q);
    };
    const placeholder = profile ? `Ask anything, ${profile.role}... e.g. "How does Iran crisis affect my portfolio?"` : `Search or ask anything...`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            position: "absolute",
                            left: 11,
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                            pointerEvents: "none"
                        },
                        children: "🔍"
                    }, void 0, false, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        onKeyDown: handleKey,
                        placeholder: placeholder,
                        style: {
                            width: "100%",
                            padding: "0.65rem 0.9rem 0.65rem 2rem",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-strong)",
                            borderRadius: 10,
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.78rem",
                            outline: "none",
                            transition: "border-color 0.15s"
                        },
                        onFocus: (e)=>e.target.style.borderColor = "var(--accent)",
                        onBlur: (e)=>e.target.style.borderColor = "var(--border-strong)"
                    }, void 0, false, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 12,
                            height: 12,
                            border: "1.5px solid var(--accent)",
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                            display: "inline-block",
                            animation: "spin 0.8s linear infinite"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NewsNavigator.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "0.75rem 1rem",
                    background: "var(--bg-secondary)",
                    borderRadius: 10,
                    border: "1px solid var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)"
                    },
                    children: "Gathering angles · Synthesizing Master Briefing…"
                }, void 0, false, {
                    fileName: "[project]/components/NewsNavigator.tsx",
                    lineNumber: 145,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NewsNavigator.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--bg-secondary)",
                    borderRadius: 12,
                    border: "1px solid var(--border-strong)",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0.75rem 1rem",
                            borderBottom: "1px solid var(--border)",
                            background: "var(--bg-tertiary)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "var(--accent)",
                                    marginBottom: 3
                                },
                                children: "Master Briefing"
                            }, void 0, false, {
                                fileName: "[project]/components/NewsNavigator.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "var(--font-display)",
                                    fontSize: "0.9rem",
                                    color: "var(--text-primary)",
                                    fontWeight: 600
                                },
                                children: result.query
                            }, void 0, false, {
                                fileName: "[project]/components/NewsNavigator.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            result.angles_researched?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.68rem",
                                    color: "var(--text-muted)",
                                    marginTop: 4
                                },
                                children: [
                                    "Researched: ",
                                    result.angles_researched.slice(0, 3).join(" · ")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NewsNavigator.tsx",
                                lineNumber: 169,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "1rem"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MasterBriefing, {
                            content: result.master_briefing
                        }, void 0, false, {
                            fileName: "[project]/components/NewsNavigator.tsx",
                            lineNumber: 178,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this),
                    result.followup_questions?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0.75rem 1rem",
                            borderTop: "1px solid var(--border)",
                            display: "flex",
                            flexDirection: "column",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.65rem",
                                    color: "var(--text-muted)",
                                    fontWeight: 600,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    marginBottom: 2
                                },
                                children: "Dig Deeper"
                            }, void 0, false, {
                                fileName: "[project]/components/NewsNavigator.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this),
                            result.followup_questions.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleFollowup(q),
                                    style: {
                                        textAlign: "left",
                                        padding: "0.5rem 0.75rem",
                                        borderRadius: 8,
                                        background: "var(--bg-tertiary)",
                                        border: "1px solid var(--border)",
                                        color: "var(--text-secondary)",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.75rem",
                                        cursor: "pointer",
                                        transition: "all 0.15s",
                                        lineHeight: 1.4
                                    },
                                    onMouseOver: (e)=>{
                                        e.currentTarget.style.borderColor = "var(--accent)";
                                        e.currentTarget.style.color = "var(--accent)";
                                    },
                                    onMouseOut: (e)=>{
                                        e.currentTarget.style.borderColor = "var(--border)";
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    },
                                    children: [
                                        "→ ",
                                        q
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/NewsNavigator.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0.5rem 1rem",
                            borderTop: "1px solid var(--border)",
                            display: "flex",
                            justifyContent: "flex-end"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setResult(null),
                            style: {
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--text-muted)",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.7rem"
                            },
                            children: "Clear ✕"
                        }, void 0, false, {
                            fileName: "[project]/components/NewsNavigator.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/NewsNavigator.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NewsNavigator.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NewsNavigator.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(NewsNavigator, "Q4uQX1J5Xd1MTzZkjfUKpZBD4r8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = NewsNavigator;
var _c, _c1;
__turbopack_context__.k.register(_c, "MasterBriefing");
__turbopack_context__.k.register(_c1, "NewsNavigator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Onboarding$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Onboarding.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useUserProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsNavigator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NewsNavigator.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ROLE_ICONS = {
    investor: "📈",
    founder: "🚀",
    student: "🎓",
    executive: "🏢",
    journalist: "📰",
    policy: "🏛"
};
// ── Hardcoded article — always pinned in feed ─────────────────
const HARDCODED_JOB_ID = "hardcoded-west-asia-chip-001";
const HARDCODED_CARD = {
    id: 9999,
    headline: "West Asia conflict casts shadow on India's chip goals",
    category: "Technology",
    time: "Featured",
    url: "",
    trending: false,
    hardcoded: true,
    jobId: HARDCODED_JOB_ID
};
// Profile → keyword query
function getPersonalizedQuery(profile) {
    if (!profile) return "Indian economy business markets";
    const roleKw = {
        investor: "stock market equity portfolio NSE BSE returns",
        founder: "startup funding venture capital competitor M&A",
        student: "business explainers career news economics education",
        executive: "corporate strategy supply chain regulation",
        journalist: "facts sources policy government data",
        policy: "RBI SEBI government regulation fiscal monetary"
    };
    const ageKw = {
        "18-24": "entry level explainer beginner context",
        "25-34": "career growth investment opportunity",
        "35-49": "wealth management industry analysis",
        "50+": "dividend blue chip stable retirement"
    };
    const interestKw = (profile.interests || []).slice(0, 2).join(" ");
    return [
        roleKw[profile.role] || "",
        ageKw[profile.age] || "",
        interestKw
    ].filter(Boolean).join(" ").slice(0, 200);
}
// Extract hot topics
function extractTopics(headlines) {
    const freq = {};
    const skip = new Set([
        "that",
        "this",
        "with",
        "from",
        "have",
        "will",
        "been",
        "they",
        "their",
        "also",
        "more",
        "into"
    ]);
    headlines.forEach((h)=>{
        h.headline.split(/\s+/).forEach((w)=>{
            const c = w.replace(/[^a-zA-Z]/g, "");
            if (c.length > 4 && !skip.has(c.toLowerCase())) freq[c] = (freq[c] || 0) + 1;
        });
        if (h.category) freq[h.category] = (freq[h.category] || 0) + 3;
    });
    return Object.entries(freq).sort((a, b)=>b[1] - a[1]).slice(0, 10).map(([k])=>k);
}
// News card
function NewsCard({ item, profile, isPreprocessed, onGenerate, loading }) {
    const roleColor = {
        investor: "#22c55e",
        founder: "#f59e0b",
        student: "#a78bfa",
        executive: "#60a5fa",
        journalist: "#f97316",
        policy: "#fb7185"
    };
    const accent = roleColor[profile?.role || ""] || "var(--accent)";
    const hook = profile ? ({
        investor: `Market signal: "${item.headline.slice(0, 42)}..." — check portfolio impact.`,
        founder: `Founder lens: "${item.headline.slice(0, 42)}..." — spot competitor moves.`,
        student: `Study this: "${item.headline.slice(0, 42)}..." — we'll add explainers.`,
        executive: `Strategic: "${item.headline.slice(0, 42)}..." — regulatory implications.`,
        journalist: `Source check: "${item.headline.slice(0, 42)}..." — key facts & data.`,
        policy: `Policy view: "${item.headline.slice(0, 42)}..." — macro implications.`
    })[profile.role] || item.headline.slice(0, 80) : item.headline.slice(0, 80);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "var(--bg-secondary)",
            borderRadius: 14,
            border: item.hardcoded ? "1px solid rgba(249,115,22,0.35)" : "1px solid var(--border)",
            overflow: "hidden",
            transition: "transform 0.15s, border-color 0.15s"
        },
        onMouseOver: (e)=>{
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.borderColor = "var(--border-strong)";
        },
        onMouseOut: (e)=>{
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.borderColor = item.hardcoded ? "rgba(249,115,22,0.35)" : "var(--border)";
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 2,
                    background: accent,
                    opacity: 0.7
                }
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "0.9rem 1rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 7
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.63rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "var(--text-muted)",
                                    background: "var(--bg-tertiary)",
                                    padding: "2px 8px",
                                    borderRadius: 8
                                },
                                children: item.category
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 7
                                },
                                children: [
                                    item.trending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "0.62rem",
                                            color: "var(--accent)",
                                            fontFamily: "var(--font-sans)",
                                            fontWeight: 600
                                        },
                                        children: "● TRENDING"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 29
                                    }, this),
                                    item.hardcoded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "0.62rem",
                                            color: "var(--accent)",
                                            fontFamily: "var(--font-sans)",
                                            fontWeight: 600
                                        },
                                        children: "⚡ Ready"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 30
                                    }, this),
                                    isPreprocessed && !item.hardcoded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "0.62rem",
                                            color: "var(--green)",
                                            fontFamily: "var(--font-sans)",
                                            fontWeight: 600
                                        },
                                        children: "⚡ Ready"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 47
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "0.63rem",
                                            color: "var(--text-muted)",
                                            fontFamily: "var(--font-sans)"
                                        },
                                        children: item.time
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            lineHeight: 1.35,
                            color: "var(--text-primary)",
                            marginBottom: 8
                        },
                        children: item.headline
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-serif)",
                            fontSize: "0.77rem",
                            lineHeight: 1.65,
                            color: "var(--text-muted)",
                            borderLeft: `2px solid ${accent}`,
                            paddingLeft: "0.65rem",
                            marginBottom: 10
                        },
                        children: hook
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onGenerate(item),
                        disabled: loading,
                        style: {
                            width: "100%",
                            padding: "0.52rem",
                            borderRadius: 8,
                            cursor: "pointer",
                            background: loading ? "var(--bg-tertiary)" : "var(--accent)",
                            border: "none",
                            color: loading ? "var(--text-muted)" : "white",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            transition: "opacity 0.15s",
                            opacity: loading ? 0.6 : 1
                        },
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        width: 10,
                                        height: 10,
                                        border: "1.5px solid var(--text-muted)",
                                        borderTopColor: "transparent",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                        animation: "spin 0.8s linear infinite"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 17
                                }, this),
                                "Starting…"
                            ]
                        }, void 0, true) : item.hardcoded ? "⚡ View Briefing" : isPreprocessed ? "⚡ View Briefing" : "Generate Briefing →"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c = NewsCard;
function SkeletonCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "var(--bg-secondary)",
            borderRadius: 14,
            border: "1px solid var(--border)",
            padding: "0.9rem 1rem",
            animation: "pulse 1.5s infinite"
        },
        children: [
            [
                "30%",
                10
            ],
            [
                "85%",
                14
            ],
            [
                "65%",
                14
            ],
            [
                "100%",
                36
            ]
        ].map(([w, h], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: h,
                    width: w,
                    background: "var(--bg-tertiary)",
                    borderRadius: 4,
                    marginBottom: i < 3 ? 8 : 0
                }
            }, i, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_c1 = SkeletonCard;
function HomePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { profile, saveProfile, clearProfile, loaded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [headlines, setHeadlines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fetching, setFetching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [preprocessed, setPreprocessed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [loadingId, setLoadingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            const t = setInterval({
                "HomePage.useEffect.t": ()=>setTime(new Date().toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Kolkata"
                    }) + " IST")
            }["HomePage.useEffect.t"], 1000);
            return ({
                "HomePage.useEffect": ()=>clearInterval(t)
            })["HomePage.useEffect"];
        }
    }["HomePage.useEffect"], []);
    const fetchHeadlines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomePage.useCallback[fetchHeadlines]": async ()=>{
            setFetching(true);
            try {
                const res = await fetch("http://localhost:8000/trending", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        profile,
                        limit: 5
                    })
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                if (data.headlines?.length) {
                    setHeadlines(data.headlines);
                    setTimeout({
                        "HomePage.useCallback[fetchHeadlines]": ()=>setPreprocessed(new Set([
                                data.headlines[0].id
                            ]))
                    }["HomePage.useCallback[fetchHeadlines]"], 2000);
                }
            } catch  {
                setError("Cannot reach backend — is uvicorn running on port 8000?");
            } finally{
                setFetching(false);
            }
        }
    }["HomePage.useCallback[fetchHeadlines]"], [
        profile
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            if (loaded && profile) {
                fetchHeadlines();
                const t = setInterval(fetchHeadlines, 5 * 60 * 1000);
                return ({
                    "HomePage.useEffect": ()=>clearInterval(t)
                })["HomePage.useEffect"];
            }
        }
    }["HomePage.useEffect"], [
        loaded,
        fetchHeadlines
    ]);
    const handleGenerate = async (item)=>{
        // ── Hardcoded article: go straight to dashboard ──────────
        if (item.hardcoded && item.jobId) {
            router.push(`/dashboard/${item.jobId}`);
            return;
        }
        setLoadingId(item.id);
        setError("");
        try {
            const res = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: item.url,
                    headline: item.headline,
                    context: getPersonalizedQuery(profile),
                    user_portfolio: profile?.portfolio?.length ? profile.portfolio : [
                        "Reliance Industries",
                        "Nifty 50",
                        "Infosys"
                    ],
                    user_profile: profile ? {
                        role: profile.role,
                        age: profile.age,
                        interests: profile.interests
                    } : null
                })
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            if (!data.job_id) throw new Error("No job_id");
            router.push(`/dashboard/${data.job_id}`);
        } catch (e) {
            setError(`Error: ${e.message}`);
        } finally{
            setLoadingId(null);
        }
    };
    if (loaded && !profile) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Onboarding$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Onboarding"], {
        onComplete: saveProfile
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 221,
        columnNumber: 34
    }, this);
    if (!loaded) return null;
    const topics = extractTopics(headlines);
    // Merge hardcoded card at position 2 (index 1) in feed
    const feed = fetching ? [] : [
        ...headlines.slice(0, 1),
        HARDCODED_CARD,
        ...headlines.slice(1)
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "var(--bg-primary)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    position: "sticky",
                    top: 0,
                    zIndex: 40,
                    background: "rgba(15,17,21,0.95)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: 1140,
                        margin: "0 auto",
                        padding: "0.7rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "1.15rem",
                                fontWeight: 700,
                                color: "var(--text-primary)"
                            },
                            children: [
                                "ET News",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--accent)"
                                    },
                                    children: "Flow"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 243,
                                    columnNumber: 20
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.7rem",
                                        color: "var(--text-muted)"
                                    },
                                    children: [
                                        "● ",
                                        time
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "0.28rem 0.8rem",
                                        borderRadius: 20,
                                        background: "var(--bg-secondary)",
                                        border: "1px solid var(--border-strong)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: ROLE_ICONS[profile?.role || ""] || "👤"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.73rem",
                                                fontWeight: 500,
                                                color: "var(--text-secondary)"
                                            },
                                            children: profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : "Reader"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: clearProfile,
                                            title: "Change profile",
                                            style: {
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                color: "var(--text-muted)",
                                                fontSize: "0.68rem",
                                                lineHeight: 1,
                                                padding: "0 2px"
                                            },
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1140,
                    margin: "0.75rem auto",
                    padding: "0 1.5rem"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: 10,
                        padding: "0.65rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.78rem",
                                color: "#fca5a5"
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setError(""),
                            style: {
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#fca5a5",
                                fontSize: "0.78rem"
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 268,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 265,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1140,
                    margin: "0 auto",
                    padding: "1.25rem 1.5rem",
                    display: "grid",
                    gridTemplateColumns: "270px 1fr",
                    gap: "1.5rem",
                    alignItems: "start"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        style: {
                            position: "sticky",
                            top: 68,
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.25rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsNavigator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsNavigator"], {
                                profile: profile
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.63rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color: "var(--text-muted)",
                                            marginBottom: 8
                                        },
                                        children: "Hot Topics"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 6
                                        },
                                        children: topics.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "0.28rem 0.7rem",
                                                    borderRadius: 14,
                                                    cursor: "pointer",
                                                    background: i < 3 ? "var(--accent-dim)" : "var(--bg-secondary)",
                                                    border: i < 3 ? "1px solid rgba(249,115,22,0.3)" : "1px solid var(--border)",
                                                    color: i < 3 ? "var(--accent)" : "var(--text-muted)",
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: "0.7rem",
                                                    fontWeight: 500
                                                },
                                                children: t
                                            }, t, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            profile?.interests?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "0.8rem 0.9rem",
                                    background: "var(--bg-secondary)",
                                    borderRadius: 12,
                                    border: "1px solid var(--border)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.63rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            color: "var(--text-muted)",
                                            marginBottom: 8
                                        },
                                        children: "Your Interests"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 5
                                        },
                                        children: profile.interests.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "0.68rem",
                                                    padding: "2px 8px",
                                                    background: "var(--bg-tertiary)",
                                                    borderRadius: 10,
                                                    color: "var(--text-muted)",
                                                    border: "1px solid var(--border)",
                                                    fontFamily: "var(--font-sans)"
                                                },
                                                children: i
                                            }, i, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: "1.1rem"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "var(--font-display)",
                                            fontSize: "1.2rem",
                                            fontWeight: 700,
                                            color: "var(--text-primary)"
                                        },
                                        children: [
                                            "For You",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: "0.72rem",
                                                    fontWeight: 400,
                                                    color: "var(--text-muted)",
                                                    marginLeft: 10
                                                },
                                                children: [
                                                    "curated for ",
                                                    profile?.role || "you",
                                                    " · ",
                                                    profile?.age || ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: fetchHeadlines,
                                        disabled: fetching,
                                        style: {
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "var(--text-muted)",
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.75rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: "inline-block",
                                                    animation: fetching ? "spin 1s linear infinite" : "none"
                                                },
                                                children: "↻"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 15
                                            }, this),
                                            "Refresh"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.9rem"
                                },
                                children: fetching ? Array.from({
                                    length: 5
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, i, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 51
                                    }, this)) : feed.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            animation: "fadeUp 0.4s ease forwards",
                                            animationDelay: `${idx * 60}ms`,
                                            opacity: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewsCard, {
                                            item: item,
                                            profile: profile,
                                            isPreprocessed: preprocessed.has(item.id),
                                            onGenerate: handleGenerate,
                                            loading: loadingId === item.id
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 21
                                        }, this)
                                    }, item.id, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    textAlign: "center",
                                    marginTop: "2rem",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.7rem",
                                    color: "var(--text-muted)"
                                },
                                children: "Powered by 5 AI Agents · LangGraph · Human-in-the-loop"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 234,
        columnNumber: 5
    }, this);
}
_s(HomePage, "B+SFwsfj7dA3g48e3qVryGR8/rM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"]
    ];
});
_c2 = HomePage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "NewsCard");
__turbopack_context__.k.register(_c1, "SkeletonCard");
__turbopack_context__.k.register(_c2, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_131jm~.._.js.map