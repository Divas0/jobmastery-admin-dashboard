// {data.map((item, index) => (
//     <li key={index} className="mb-2">
//       <NavLink
//         to={item.route}
//         className={({ isActive }) =>
//           isActive
//             ? "bg-gray-600 py-2   rounded flex items-center"
//             : "py-2  hover:bg-gray-700 rounded flex items-center"
//         }
        
//       >
//         {isToggled ? item.icon : item.routeName}
//       </NavLink>
//     </li>
//   ))}
// </ul>

const data = [
    {route:"/dashboard", routeName:"Dashboard", icon:<LayoutDashboard/>},
    { route: "/user", routeName: "User Management", icon: <User /> },
    { route: "/news", routeName: "News Management", icon: <Newspaper /> },
    
  ];
  const userDropdown=[
    {route:'/adduser', routeName:'Add User', icon:<UserCircle/>},
    {route:'/viewuser', routeName:'View User' , icon:<UserActivation/>},
    {route:'/manageuser', routeName:'Manage User', icon:<UsersRound/>}
  ]
  const newsDropdown=[
    {route:'/addnews', routeName:'Add News', icon:<NewspaperIcon/>},
    {route:'/viewnews', routeName:'View News' , icon:<NewspaperIcon/>},
  
  ]