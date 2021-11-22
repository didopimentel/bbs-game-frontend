import { useContext } from 'react'
import {
  Container,
  Grid,
  MenuList,
  MenuItem,
  Card,
  Typography,
} from "@mui/material";
import httpHandler from "../../http/axios";
import styles from "../../styles/Dashboard.module.css";
import { useAuth } from '../../contexts/auth.js';
import useSWR from 'swr';

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const dataMotd = useSWR(!isAuthenticated ? false : 'motd', httpHandler.get);
  const dataPlayer = useSWR(!isAuthenticated ? false: 'players/3', httpHandler.get);

  const player = dataPlayer?.data?.data
  const motd = dataMotd?.data?.data

  return (
    <Container className={styles.container_dashboard}>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={2}>
          <Card className={styles.card_dashboard_menu}>
            <MenuList>
              <MenuItem>Back to town</MenuItem>
              <MenuItem>Travel</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card className={styles.card_dashboard_main}>
            <Town motd={motd}/>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={styles.card_character_info}>
            <PlayerInfo player={player} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

const PlayerInfo = ({ player }) => {
  if (!player) {
    return (
      <table width="100%">
      <tr>
        <td width="80%">Name</td>
        <td></td>
      </tr>
      <tr>
        <td>Level</td>
        <td></td>
      </tr>
      <tr>
        <td>HP</td>
        <td></td>
      </tr>
    </table>
    )
  }
  return (
    <table width="100%">
      <tr>
        <td width="80%">Name</td>
        <td>{player.name}</td>
      </tr>
      <tr>
        <td>Level</td>
        <td>{player.level}</td>
      </tr>
      <tr>
        <td>HP</td>
        <td>{`${player.hp}/${player.total_hp}`}</td>
      </tr>
    </table>
  );
}


const Town = ({ motd }) => (
  <>
    <Typography>{motd}</Typography>
  </>
);

export default Dashboard