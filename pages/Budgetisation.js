import { useFormik } from "formik";
import { evaluate } from "mathjs";
import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import * as yup from "yup";
import Input from "../components/Input";
import Modalc from "../components/Modal";
import {
  timeToDate,
  dateDiffrence,
  dateToTime,
  DateContext,
} from "../utils/functions";
import { globalStyles } from "../styles/global";
import { ScrollView, TouchableOpacity, View } from "react-native";
import RoundButton from "../components/RoundButton";
import CircleButton from "../components/CircleButton";
import { modalStyles } from "../styles/modal";
import jourStyles from "../styles/jour";
import { fontSize, fourth_color } from "../styles/vars";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Textc from "../components/Textc";
import confirmModalStyles from "../styles/confirmModal";
import {
  addBudgetGlobal,
  getAllBudgetGlobal,
} from "../backEnd/dao/budgetGlobalDao";

export default function Budgetisation() {
  const [, errorShow, setErrorShow, errorMsg, setErrorMsg] =
    useContext(DateContext);
  const [content, setContent] = useState([]);
  const [show, setShow] = useState([false, false]);
  const [maxD, setMaxD] = useState("01/01/2000");
  useEffect(() => {
    getAllBudgetGlobal()
      .then((data) => {
        setContent([...data.map((el) => addMofifierBtn(el))]);
      })
      .catch((e) => {});
  }, []);
  useEffect(() => {
    setMaxD(timeToDate(Math.max(...content.map((o) => dateToTime(o.dateFin)))));
  }, [content]);

  const addToContent = (el) => {
    let x = content;
    x.push(el);
    setContent([...x]);
  };

  const addMofifierBtn = (el) => {
    let v = el;
    v["modifier"] = (
      <View style={jourStyles.actionsContainer}>
        <TouchableOpacity
          onPress={() =>
            generalModalOpen(1, {
              budget: v.budget,
              dateDebut: v.dateDebut,
              dateFin: v.dateFin,
            })
          }
        >
          <MaterialCommunityIcons
            name="pencil"
            size={fontSize * 1.2}
            color={fourth_color}
          />
        </TouchableOpacity>
      </View>
    );
    return v;
  };
  const depenseSchema = yup.object({
    budget: yup.string().required("Ce champ est obligatoire"),
    commentaire: yup.string().max(20, "Commentaire trop long"),
    dateDebut: yup.string().required("Ce champ est obligatoire"),
    dateFin: yup.string().required("Ce champ est obligatoire"),
  });
  const addFormik = useFormik({
    initialValues: {
      budget: "",
      dateDebut: "",
      dateFin: "",
    },
    validateOnChange: false,
    validationSchema: depenseSchema,
    validate: (values) => {
      const errors = {};
      try {
        addFormik.setFieldValue("budget", evaluate(values.budget).toString());
      } catch (error) {
        try {
          addFormik.setFieldValue(
            "budget",
            evaluate(
              values.budget.substring(1, values.budget.length)
            ).toString()
          );
        } catch (error) {
          errors.budget = "Veillez saisir un nombre ou une equation valide";
        }
      }
      if (dateDiffrence(values.dateDebut, values.dateFin) < 0) {
        errors.dateFin = "La date de fin doit être après la date de début";
      }
      if (dateDiffrence(maxD, values.dateDebut) < 0) {
        errors.dateDebut = "La date de fin doit être ultérieur à " + maxD;
      }
      return errors;
    },
    onSubmit: (values) => {
      let vals = values;
      vals.reste = values.budget;
      addBudgetGlobal(vals)
        .then((val) => {
          let v = addMofifierBtn(val);
          addToContent(v);
        })
        .catch((e) => {
          setErrorMsg(e.msg);
          setErrorShow(true);
        });

      generalModalClose(0);
    },
  });
  const editFormik = useFormik({
    initialValues: {
      budget: "",
      dateDebut: "",
      dateFin: "",
    },
    validateOnChange: false,
    validationSchema: depenseSchema,
    validate: (values) => {
      const errors = {};
      try {
        editFormik.setFieldValue("budget", evaluate(values.budget).toString());
      } catch (error) {
        try {
          editFormik.setFieldValue(
            "budget",
            evaluate(
              values.budget.substring(1, values.budget.length)
            ).toString()
          );
        } catch (error) {
          errors.budget = "Veillez saisir un nombre ou une equation valide";
        }
      }
      if (dateDiffrence(values.dateDebut, values.dateFin) < 0) {
        errors.dateFin = "La date de fin doit être après la date de début";
      }
      if (dateDiffrence(maxD, values.dateDebut) < 0) {
        errors.dateDebut = "La date de fin doit être ultérieur à " + maxD;
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      generalModalClose(1);
    },
  });
  const generalModalClose = (i) => {
    const formik = [addFormik, editFormik];
    let x = show;
    x[i] = false;
    setShow([...x]);
    formik[i].resetForm();
  };
  const generalModalOpen = (i, obj) => {
    const formik = [addFormik, editFormik];
    let x = [false, false];
    x[i] = true;
    if (obj) {
      for (let el of Object.keys(obj)) {
        formik[i].setFieldValue(el, obj[el].toString());
      }
    }
    setShow([...x]);
  };
  return (
    <ScrollView style={globalStyles.pageContainer}>
      <View style={jourStyles.addButtonContainer}>
        <CircleButton
          btnStyle={jourStyles.circleBtn}
          onPress={() => generalModalOpen(0)}
          title={
            <FontAwesome5
              name="plus"
              size={fontSize * 1.5}
              color={fourth_color}
            />
          }
        />
      </View>
      <Card>
        <Table
          headers={["Budget", "Début", "Fin", "Reste", "Modifier"]}
          content={content}
          toIgnore={["id"]}
          nbIcons={1}
          dateIndexTab={[1, 2]}
        />
      </Card>
      <Modalc show={show[0]} closeFunction={() => generalModalClose(0)}>
        <View className="depense-modal">
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Tu as encore depensé !
          </Textc>
          <View style={"form"}>
            <Input
              color={fourth_color}
              type="number"
              onChange={(e) => addFormik.setFieldValue("budget", e)}
              value={addFormik.values.budget}
              placeholder="Budget"
              error={addFormik.errors?.budget}
            />
            <Input
              color={fourth_color}
              type="mois"
              onChange={(e) => addFormik.setFieldValue("dateDebut", e)}
              value={addFormik.values.dateDebut}
              placeholder="Date de début"
              error={addFormik.errors?.dateDebut}
              allowChangeMonth
            />
            <Input
              color={fourth_color}
              type="mois"
              onChange={(e) => addFormik.setFieldValue("dateFin", e)}
              value={addFormik.values.dateFin}
              placeholder="Date de fin"
              error={addFormik.errors?.dateFin}
              allowChangeMonth
            />
            <View style={modalStyles.modalBtnContainer}>
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={addFormik.handleSubmit}
                title="Confirmer"
              />
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={() => generalModalClose(0)}
                title="Annuler"
              />
            </View>
          </View>
        </View>
      </Modalc>
      <Modalc show={show[1]} closeFunction={() => generalModalClose(1)}>
        <View className="depense-modal">
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Tu as encore depensé !
          </Textc>
          <View style={"form"}>
            <Input
              color={fourth_color}
              type="number"
              onChange={(e) => editFormik.setFieldValue("budget", e)}
              value={editFormik.values.budget}
              placeholder="Budget"
              error={editFormik.errors?.budget}
            />
            <Input
              color={fourth_color}
              type="mois"
              onChange={(e) => editFormik.setFieldValue("dateDebut", e)}
              value={editFormik.values.dateDebut}
              placeholder="Date de début"
              error={editFormik.errors?.dateDebut}
              allowChangeMonth
            />
            <Input
              color={fourth_color}
              type="mois"
              onChange={(e) => editFormik.setFieldValue("dateFin", e)}
              value={editFormik.values.dateFin}
              placeholder="Date de fin"
              error={editFormik.errors?.dateFin}
              allowChangeMonth
            />
            <View style={modalStyles.modalBtnContainer}>
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={editFormik.handleSubmit}
                title="Confirmer"
              />
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={() => generalModalClose(1)}
                title="Annuler"
              />
            </View>
          </View>
        </View>
      </Modalc>
    </ScrollView>
  );
}
