export default [
  { path: '/login', file: 'routes/login.jsx', showInNav: true, label: "login | signup" },
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
  { path: '/courses/:tab/:courseId', file: 'routes/courses.$tab.$courseId.jsx', showInNav: false },
  { path: '/blog', file: 'routes/blog.jsx', showInNav: true, label: "blog" },
  { path: '/blog/:id', file: 'routes/blog.$blogId.jsx', showInNav: false },
  { path: '/contact', file: 'routes/contact.jsx', showInNav: true, label: "contact" },
  { path: '/profile', file: 'routes/profile.jsx', showInNav: true, label: "profile" },
  { path: '/about', file: 'routes/about.jsx', showInNav: true, label: "about us" },
]