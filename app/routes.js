export default [
  { path: '/login', file: 'routes/login.jsx', showInNav: true, label: "login" },
  { path: '/', file: 'routes/_index.jsx', showInNav: true, label: "home" },
  {
    path: '/courses',
    file: 'routes/courses.jsx',
    showInNav: true,
    label: "courses",
    navTo: '/courses/frontend',
    children: [
      { path: ':tab', file: 'routes/courses.$tab.jsx' }
    ]
  },
  { path: '/contact', file: 'routes/contact.jsx', showInNav: true, label: "contact" },
]