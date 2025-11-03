export default [
  { path: '/', file: 'routes/_index.jsx', showInNav: false },
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
  { path: '/blog', file: 'routes/blog.jsx', showInNav: true, label: "blogs" },
  { path: '/blog/:id', file: 'routes/blog.$blogId.jsx', showInNav: false },
  { path: '/about', file: 'routes/about.jsx', showInNav: true, label: "about us" },
  { path: '/contact', file: 'routes/contact.jsx', showInNav: true, label: "contact" },
  { path: '/login', file: 'routes/login.jsx', showInNav: true, label: "login | signup" },
  { path: '/profile', file: 'routes/profile.jsx', showInNav: false },
  { path: '/logout', file: 'routes/logout.jsx', showInNav: false }
]