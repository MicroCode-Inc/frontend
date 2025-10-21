export default [
  { path: '/', file: 'routes/_index.jsx', showInNav: true, label: "home" },
  { path: '/contact', file: 'routes/contact.jsx', showInNav: true, label: "contact" },
  { path: '/test', file: 'routes/test.jsx', showInNav: true, label: "test" },
  { path: '/users', file: 'routes/users.jsx', showInNav: false },
  { path: '/:name', file: 'routes/$name.jsx', showInNav: false },
  { 
    path: '/courses/', 
    file: 'routes/courses.jsx', 
    showInNav: true, 
    label: "courses",
    children: [
      { path: ':tab', file: 'routes/courses.$tab.jsx' }
    ]
  }
]