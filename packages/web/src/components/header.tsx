import { FC, forwardRef } from 'react';
import { Box, Flex, Heading, Link, Text, ThemeProvider } from 'theme-ui';


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


type HeaderProps = {
  sticky?: boolean;
  scrollingDown?: boolean;
  headerHeight: number;
};

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ sticky, scrollingDown, headerHeight }, ref) => (
  <Box
    as='header'
    bg='white'
    ref={ref}
    sx={{
      position: sticky ? 'fixed' : 'static',
      top: scrollingDown ? `${-headerHeight}px` : '0px',
      transition: 'top .3s ease',
      width: '100%',
      overflow: 'visible',
    }}
  >
    <Flex
      px={3}
      py={0}
      sx={{
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'grey-light',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
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
      sx={{
        textTransform: 'uppercase',
        borderBottom: '1px solid',
        borderColor: 'grey-light',
        flexDirection: 'row',
        flexWrap: 'nowrap',
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          flex: 12,
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
        }}
      >
        {LEFT_NAV_ITEMS.map((n) => (
          <NavItem
            key={n.name}
            name={n.name}
            link={n.link}
          />
        ))}
      </Flex>
      <Flex
        bg='black'
        sx={{
          alignItems: 'center',
          flex: '1 0 auto',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-end',
        }}
      >
        {RIGHT_NAV_ITEMS.map((n) => (
          <NavItem
            key={n.name}
            name={n.name}
            link={n.link}
            invert
          />
        ))}
      </Flex>
    </Flex>
  </Box>
));

export default Header;
