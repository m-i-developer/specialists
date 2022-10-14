/* eslint-disable no-nested-ternary */
import {
  Box,
  Button as MUIButton,
  Chip as CustomChip,
  Divider,
  ListItemButton,
  Menu,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const Header = styled(Stack)`
  width: calc(100% - 32px);
  padding: 16px;
  border-radius: 12px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
`

export const Chips = styled(Stack)`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 965px;
  justify-content: flex-start;
  margin-bottom: -8px;

  div {
    margin: 0px 4px 8px 4px;
    box-sizing: border-box;
    border: 1px solid #8a84d6;
  }
`

export const Chip = styled(CustomChip)`
  svg {
    display: none;
  }
`

export const SortButton = styled(MUIButton)`
  font-size: 14px;
  line-height: 24px;
  text-transform: none;
  justify-content: space-between;
  border-radius: 8px;
  height: 40px;
`

export const SymptomsButtonWrapper = styled(Box)`
  min-width: 120px;
  display: flex;
  align-self: flex-start;
`

export const SymptomsButton = styled(MUIButton)`
  text-transform: none;
  border-radius: 8px;
`

export const IconButton = styled(MUIButton)`
  min-width: 32px;
`

export const FavoriteButton = styled(MUIButton)`
  min-width: 32px;
  border-radius: 48px;
`

export const Point = styled(Box)`
  position: absolute;
  top: 3px;
  right: 3px;
  border: 4px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px;
`

export const MenuWrapper = styled(Menu)`
  left: 50%;
  top: 197px;
  width: 400px;

  .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded {
    left: 0 !important;
    top: 0 !important;
    max-height: 75vh;
  }

  nav {
    overflow-y: scroll;
    max-height: 54vh;
  }
`

export const MenuInner = styled(Stack)`
  padding-top: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 368px;
  height: 100%;
`

export const MenuHeader = styled(Stack)`
  padding: 0 16px;
`

export const Subheader = styled(Stack)`
  color: ${({ theme }) => theme.palette.text.secondary};

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.17px;
  }
`

export const DividerWithMargin = styled(Divider)`
  margin: 8px -24px;
`

export const FilterButton = styled(ListItemButton)`
  svg {
    margin-right: 32px;
  }
`

export const FooterButtons = styled(Stack)`
  padding: 0 16px;
`

export const Button = styled(MUIButton)`
  border-radius: 8px;
  text-transform: none;

  &:disabled {
    background-color: #F1F0FA;
    color: #D7D4F1;
  }
`
