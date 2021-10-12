import { useRef } from "react";
import { Form } from "@unform/web";
import { Box, Grid } from "@material-ui/core";
import * as Yup from "yup";
import moment from "moment";

import { Input } from "./Input";

export default function App() {
  const formRef = useRef();

  function isSameOrAfter(startTime, endTime) {
    return moment(startTime, "HH:mm").isAfter(moment(endTime, "HH:mm"));
  }

  async function handleSubmit(data) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        horas: Yup.array().of(
          Yup.object().shape({
            hora_saida: Yup.string().required("Campo obrigatório"),
            hora_chegada: Yup.string().required("Campo obrigatório")
          })
        )
      });

      await schema.validate(data, {
        abortEarly: false
      });

      console.log(data);
    } catch (error) {
      const validationErrors = {};

      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });

      formRef.current?.setErrors(validationErrors);

      return;
    }
  }

  return (
    <div>
      <h3>Validate Time</h3>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {[1, 2, 3, 4, 5].map((item, key) => (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                InputLabelProps={{ shrink: true }}
                label="Hora Saida"
                type="time"
                name={`horas[${key}].hora_saida`}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <Input
                InputLabelProps={{ shrink: true }}
                label="Hora Chegada"
                type="time"
                name={`horas[${key}].hora_chegada`}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}

        <Box mt={3}>
          <button type="submit">Enviar</button>
        </Box>
      </Form>
    </div>
  );
}
