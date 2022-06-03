import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";



export default function TaskHome() {
  return (
    <div >
      <List component='nav' >

        <ListItem button>
          <ListItemIcon>
            
          </ListItemIcon>
          <ListItemText primary='Juego numero 1' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary='Juego numero 2' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary='Juego numero 3' />
        </ListItem>

      </List>
    </div>
  )
}
