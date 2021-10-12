import React from 'react'
import { HeaderWrapper, HeaderInner } from './style'
import Menu from './Menu'

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderInner>
                <Menu />
            </HeaderInner>
        </HeaderWrapper>
    )
}

export default Header
