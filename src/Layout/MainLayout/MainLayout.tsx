import { Outlet } from 'react-router-dom'

import React from 'react'
import { Box } from '@mui/material'

export const MainLayout = () => {
  return (
    <Box
      component='main'
      my={9}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Outlet />
    </Box>
  )
}
