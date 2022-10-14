import { ROUTES } from 'appConstants'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Context } from 'index'
import { Specialists } from 'pages/Specialists'
import { Box } from '@mui/material'
import { Loading } from 'components/Loading'
import { MainLayout } from 'Layout/MainLayout'

const { SPECIALISTS } = ROUTES

const App = observer(() => {
  const { rootStore } = useContext(Context)
  const { loaderStore } = rootStore

  return (
    <Box
      display='flex'
      minHeight='100vh'
      overflow='hidden'
      sx={{ background: '#F1F0FA' }}
    >
      <Box width='100%' margin='0 auto'>
        {!!loaderStore.isLoading && <Loading />}

        <Routes>
          <Route element={<MainLayout />}>
            <Route path={SPECIALISTS} element={<Specialists />} />
          </Route>

          <Route path='*' element={<Navigate to={SPECIALISTS} replace />} />
        </Routes>
      </Box>
    </Box>
  )
})

export default App
