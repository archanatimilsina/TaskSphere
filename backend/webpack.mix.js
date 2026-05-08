const mix = require('laravel-mix');

// Admin App
mix.react('resources/js/react/admin/AdminApp.jsx', 'public/js/react/admin')
   .version();

// User App
mix.react('resources/js/react/user/UserApp.jsx', 'public/js/react/user')
   .version();

// Project Manager App
mix.react('resources/js/react/manager/ManagerApp.jsx', 'public/js/react/manager')
   .version();
