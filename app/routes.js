export default [
  { path: '/', file: 'routes/_index.jsx' },
  { path: '/users', file: 'routes/users.jsx' },
  { path: '/contact', file: 'routes/contact.jsx' },
  { path: '/test', file: 'routes/test.jsx' },
  {path:'/:name', file: 'routes/$name.jsx'}
]