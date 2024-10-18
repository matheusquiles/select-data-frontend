import React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorSchemeToggle from '../styles/ColorSchemeToggle';
import { closeSidebar } from './utils';
import CadastroProcesso from '../CadastroProcesso';
import Processos from '../Processos';

function Toggler({ defaultExpanded = false, renderToggle, children }) {
    const [open, setOpen] = React.useState(defaultExpanded);

    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={[
                    {
                        display: 'grid',
                        transition: '0.2s ease',
                        '& > *': {
                            overflow: 'hidden',
                        },
                    },
                    open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
                ]}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}


export default function Sidebar({ setActiveComponent }) {
    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };
    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '280px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography
                    level="body-lg"
                    sx={{ flex: '1', minWidth: '100px', maxWidth: '200px', fontSize: '28px', fontWeight: 'bold'}}>
                    Select Data
                </Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>
            <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <HomeRoundedIcon sx={{ fontSize: '24px', color: 'primary.main' }}/>
                            <ListItemContent>
                                <Typography level="title-sm" sx={{fontSize: '18px'}}
                                >Início </Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <DashboardRoundedIcon sx={{ fontSize: '24px', color: 'primary.main' }}/>
                            <ListItemContent>
                                <Typography level="title-sm" sx={{fontSize: '18px'}}>
                                    Dashboard</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <AssignmentRoundedIcon sx={{ fontSize: '24px', color: 'primary.main' }}/>
                                    <ListItemContent>
                                        <Typography level="title-sm" sx={{fontSize: '18px'}}>
                                            Processos</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5, fontSize: '16px' }}>
                                <ListItem sx={{ mt: 0.5}}>
                                    <ListItemButton onClick={() => handleMenuClick(<CadastroProcesso />) } >
                                        Novo Processo
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenuClick(<Processos />)}>Buscar Processo</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <GroupRoundedIcon sx={{ fontSize: '24px', color: 'primary.main' }}/>
                                    <ListItemContent>
                                        <Typography level="title-sm" sx={{fontSize: '18px'}}>
                                            Usuários</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open
                                                ? {
                                                    transform: 'rotate(180deg)',
                                                }
                                                : {
                                                    transform: 'none',
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5, fontSize: '16px' }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        role="menuitem"
                                        component="a"
                                        href="/joy-ui/getting-started/templates/profile-dashboard/"
                                    >
                                        Meu Perfil
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Criar novo usuário</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Permission</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                </List>
                <List
                    size="sm"
                    sx={{
                        mt: 'auto',
                        flexGrow: 0,
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                        '--List-gap': '8px',
                        mb: 2,
                    }}
                >
                    <ListItem sx={{fontSize: '16px'}}> 
                        <ListItemButton>
                            <SupportRoundedIcon />
                            Ajuda
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{fontSize: '16px'}}>
                        <ListItemButton>
                            <SettingsRoundedIcon />
                            Configurações
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm" sx={{fontSize: '18px'}}>Tiago Fittarelli</Typography>
                    <Typography level="body-xs" sx={{fontSize: '14px'}}>tfitarelli@test.com</Typography>
                </Box>
                <IconButton
                    size="lg"
                    variant="plain"
                    color="neutral"
                    sx={{ width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LogoutRoundedIcon sx={{ flex: '1', minWidth: '20px', maxWidth: '20px' }}/>
                </IconButton>
            </Box>
        </Sheet>
    );
}