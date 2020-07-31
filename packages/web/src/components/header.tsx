import React, { FC } from 'react';
import { Box, Link, Image, Flex, Text, Heading } from 'rebass';


const LEFT_NAV_ITEMS = [
  { name: 'Food & Drink', link: '/' },
  { name: 'Lifestyle', link: '/' },
  { name: 'People', link: '/' },
  { name: 'Places', link: '/' },
];

const RIGHT_NAV_ITEMS = [
  { name: 'About', link: '/' },
];


interface NavItemProps {
  name: string;
  link: string;
  invert?: boolean;
}

const NavItem: FC<NavItemProps> = ({ name, link, invert }) => (
  <Link
    href={link}
    px={3}
    sx={{
      display: 'inline-block',
      textDecoration: 'none',
      background: invert ? 'black' : 'white',
      color: invert ? 'white' : 'black',
      ':hover': {
        background: invert ? 'white' : 'black',
        color: invert ? 'black' : 'white',
      },
    }}
  >
    <Box
      py={1}
    >
      <Text
        as='span'
        variant='nav'
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {name}
      </Text>
    </Box>
  </Link>
);

const Header: FC = () => (
  <>
    <Flex
      as='header'
      bg='white'
      flexDirection='row'
      flexWrap='nowrap'
      justifyContent='flex-start'
      alignItems='center'
      px={3}
      py={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'grey-light',
      }}
    >
      <Link
        href='/'
        sx={{
          display: 'inline-block',
          textDecoration: 'none',
        }}
      >
        <Box>
          <Heading
            as='h1'
            variant='nav-logo'
          >
            365 MAGAZINE
          </Heading>
        </Box>
      </Link>
    </Flex>
    <Flex
      as='nav'
      bg='white'
      flexDirection='row'
      flexWrap='nowrap'
      sx={{
        textTransform: 'uppercase',
        borderBottom: '1px solid',
        borderColor: 'grey-light',
      }}
    >
      <Flex
        flex={12}
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='flex-start'
        alignItems='center'
      >
        {LEFT_NAV_ITEMS.map((n) => (
          <NavItem
            name={n.name}
            link={n.link}
          />
        ))}
      </Flex>
      <Flex
        flex='1 0 auto'
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='flex-end'
        alignItems='center'
        bg='black'
      >
        {RIGHT_NAV_ITEMS.map((n) => (
          <NavItem
            name={n.name}
            link={n.link}
            invert
          />
        ))}
      </Flex>
    </Flex>
  </>
);

export default Header;
