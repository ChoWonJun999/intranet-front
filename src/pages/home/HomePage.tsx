import {
  EmailField,
  NumberField,
  PasswordField,
  PatternNumberField,
  TextField,
} from '@/components/common';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import TextField2 from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PopupState, { bindFocus, bindPopper } from 'material-ui-popup-state';

export default function HomePage() {
  return (
    <>
      <form action="">
        <TextField label="이름" />
        <TextField label="비고" multiline rows={2} />
        <EmailField label="이메일" />
        <NumberField label="수량" min={10} max={100} />
        <PatternNumberField />
        <PasswordField />
        <button type="submit">저장</button>

        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <div>
              <TextField2 {...bindFocus(popupState)} />
              <Popper {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          )}
        </PopupState>
      </form>
    </>
  );
}
