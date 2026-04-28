import { Button, ButtonGroup, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByValue } from "./counterSlice";

export default function Counter() {
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <Typography>{value}</Typography>

      <Button variant="contained" onClick={() => dispatch(increment())}>
        Increment
      </Button>
      <Button variant="contained" onClick={() => dispatch(decrement())}>
        Decrement
      </Button>
      <Button variant="contained" onClick={() => dispatch(incrementByValue(5))}>
        Increment by 5
      </Button>
    </>
  );
}
