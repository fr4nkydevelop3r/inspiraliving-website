import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { MenuWrapper, MenuItem, SubMenuItemWrapper } from './style'

function Menu() {
    const result = useStaticQuery(graphql`
        fragment menuItemData on ContentfulMenuItem {
            label
            id
            page {
                ... on ContentfulPage {
                    slug
                }
                ... on ContentfulBlog {
                    slug
                }
            }
        }

        query MenuQuery {
            contentfulMenu {
                menuItems {
                    ...menuItemData
                }
            }
        }
    `)
    /**este lo removi de la query porque no tenemos subitems
     *  subMenuItems {
                        ...menuItemData
                    }
     */

    console.log(result.contentfulMenu.menuItems)

    return (
        <MenuWrapper>
            {result.contentfulMenu.menuItems.map((menuItem) => (
                <MenuItem key={menuItem.id}>
                    {!menuItem.subMenuItems ? (
                        menuItem.label === 'Home' ? (
                            <Link to={`/`}>{menuItem.label}</Link>
                        ) : (
                            <Link to={`/${menuItem.page.slug}`}>
                                {menuItem.label}
                            </Link>
                        )
                    ) : (
                        <SubMenuItemWrapper>
                            <div>{menuItem.label}</div>
                            <div>
                                {menuItem.subMenuItems?.map((subMenuItem) => (
                                    <div key={subMenuItem.id}>
                                        <Link to={`/${subMenuItem.page.slug}`}>
                                            {subMenuItem.label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </SubMenuItemWrapper>
                    )}
                </MenuItem>
            ))}
        </MenuWrapper>
    )
}

export default Menu
