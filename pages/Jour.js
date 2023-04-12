import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFormik } from "formik";
import { useRoute } from "@react-navigation/native";
import * as yup from "yup";
import Card from "../components/Card";
import Input from "../components/Input";
import Modalc from "../components/Modal";
import Table from "../components/Table";
import jourStyles from "../styles/jour";
import { capitalise, DateContext, evaluate } from "../utils/functions";
import ConfirmModal from "../components/ConfirmModal";
import CircleButton from "../components/CircleButton";
import {
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import RoundButton from "../components/RoundButton";
import { fontSize, fourth_color } from "../styles/vars";
import { globalStyles } from "../styles/global";
import Textc from "../components/Textc";
import Grid from "../components/Grid";
import { modalStyles } from "../styles/modal";
import confirmModalStyles from "../styles/confirmModal";
import {
  addDepense,
  deleteDepense,
  getAllDepensesByDate,
  getAllDepensesByMonth,
  getAllDepensesByWeek,
} from "../backEnd/dao/depenseDao";
import {
  getBudgetByDate,
  getBudgetByMonth,
  getBudgetByWeek,
} from "../backEnd/dao/budgetDao";
import { addOrUpdateCash, getCash } from "../backEnd/dao/cashDao";
import Wallet from "../icons/Wallet";
import Calendar from "../icons/Calendar";
import Refund from "../icons/Refund";
import Cash from "../icons/Cash";
import Save from "../icons/Save";
import CheckDollar from "../icons/CheckDollar";
import Bill from "../icons/Bill";

export default function Jour() {
  const [show, setShow] = useState([false, false, false, false, false, false]);
  const [epargne, setEpargne] = useState("");
  const [cash, setCash] = useState("");
  const [budget, setBudget] = useState();
  const [reste, setReste] = useState();
  const [reintegre, setReintegre] = useState("");
  const week = ["Date", "Dépenses", "Commentaire", "Actions"];
  const { type, date } = useRoute().params;
  const dateType = useContext(DateContext);
  const [formatDate, setFormatDate] = useState();
  const [idToDelete, setIdToDelete] = useState("");

  const update = () => {
    getCash(formatDate, type)
      .then((val) => {
        console.log(type);
        if (val) {
          setCash(val.cash);
        } else {
          setCash("");
          cashFormik.setFieldValue("montant", "");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    switch (type) {
      case "jour":
        getAllDepensesByDate(formatDate)
          .then((val) => {
            setContent(addActionsToData(val));
          })
          .catch((e) => {
            console.log(e);
          });
        getBudgetByDate(formatDate)
          .then((val) => {
            setBudget(val.budget);
            setReste(val.reste);
          })
          .catch((e) => {
            console.log(e);
          });
        break;
      case "semaine":
        getAllDepensesByWeek(formatDate)
          .then((val) => {
            setContent(addActionsToData(val));
          })
          .catch((e) => {
            console.log(e);
          });
        getBudgetByWeek(formatDate)
          .then((val) => {
            setBudget(val.budget);
            setReste(val.reste);
          })
          .catch((e) => {
            console.log(e);
          });
        break;
      case "mois":
        getAllDepensesByMonth(formatDate)
          .then((val) => {
            setContent(addActionsToData(val));
          })
          .catch((e) => {
            console.log(e);
          });
        getBudgetByMonth(formatDate)
          .then((val) => {
            setBudget(val.budget);
            setReste(val.reste);
          })
          .catch((e) => {
            console.log(e);
          });
        break;
    }
  };

  useEffect(() => {
    setFormatDate(
      type === "mois"
        ? `${date.split("-")[1]}/${date.split("-")[0]}`
        : `${date.split("-")[2]}/${date.split("-")[1]}/${date.split("-")[0]}`
    );
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, type, formatDate]);

  useEffect(() => {
    dateType[1](date);
    dateType[3](type);
  }, [date, type]);

  const [content, setContent] = useState([]);
  const addActionsToData = (data) => {
    let X = [];
    for (let el of data) {
      let x = el;
      x["Actions"] = (
        <View style={jourStyles.actionsContainer}>
          <TouchableOpacity
            style={jourStyles.actionIconLeft}
            onPress={() =>
              generalModalOpen(1, {
                date: el.Date,
                montant: el.Dépense,
                commentaire: el.Comment,
              })
            }
          >
            <MaterialCommunityIcons
              name="pencil"
              size={fontSize * 1.2}
              color={fourth_color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={jourStyles.actionIconRight}
            onPress={() => {
              generalModalOpen(5);
              setIdToDelete(el.id);
            }}
          >
            <FontAwesome5
              name="trash"
              size={fontSize * 1.2}
              color={fourth_color}
            />
          </TouchableOpacity>
        </View>
      );
      X.push(x);
    }
    return X;
  };
  const sommeDepenses = (tab) => {
    if (tab.length === 0) {
      return 0;
    }
    let x = 0;
    idToDelete;
    for (let el of tab) {
      x += parseFloat(el.montant);
    }
    return x;
  };
  const generalModalClose = (i) => {
    const formik = [
      addFormik,
      editFormik,
      epargneFormik,
      cashFormik,
      reintegreFormik,
    ];
    let x = show;
    x[i] = false;
    setShow([...x]);
    formik[i]?.resetForm();
  };
  const generalModalOpen = (i, obj) => {
    const formik = [
      addFormik,
      editFormik,
      epargneFormik,
      cashFormik,
      reintegreFormik,
    ];
    let x = [false, false, false, false, false, false];
    x[i] = true;
    if (obj) {
      for (let el of Object.keys(obj)) {
        formik[i]?.setFieldValue(el, obj[el]);
      }
    }
    setShow([...x]);
  };

  const confirmFunction = () => {
    deleteDepense(idToDelete)
      .then(() => {
        update();
      })
      .catch((e) => {
        console.log(e);
      });
    generalModalClose(5);
  };

  const depenseSchema = yup.object({
    montant: yup.string().required("Ce champ est obligatoire"),
    commentaire: yup.string().max(20, "Commentaire trop long"),
    date: yup.string().required("Ce champ est obligatoire"),
  });
  const addFormik = useFormik({
    initialValues: {
      montant: "",
      commentaire: "",
      date: type === "jour" ? formatDate : "",
    },
    validateOnChange: false,
    validationSchema: depenseSchema,
    validate: (values) => {
      const errors = {};
      try {
        addFormik.setFieldValue("montant", evaluate(values.montant).toString());
      } catch (error) {
        try {
          addFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      addDepense(values)
        .then((val) => {
          setContent([...addActionsToData([val]), ...content]);
          update();
          generalModalClose(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  const editFormik = useFormik({
    initialValues: {
      montant: "",
      commentaire: "",
      date: "",
    },
    validateOnChange: false,
    validationSchema: depenseSchema,
    validate: (values) => {
      const errors = {};
      try {
        editFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          editFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      generalModalClose(1);
    },
  });
  const epargneFormik = useFormik({
    initialValues: {
      montant: "",
      type: "",
      date: "",
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        epargneFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          epargneFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      setEpargne(values.montant);
      generalModalClose(2);
    },
  });
  const cashFormik = useFormik({
    initialValues: {
      montant: cash.toString(),
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        cashFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          cashFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      addOrUpdateCash(formatDate, type, values.montant)
        .then((val) => {
          setCash(val.cash);
          generalModalClose(3);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  const reintegreFormik = useFormik({
    initialValues: {
      montant: "",
      type: "",
      date: "",
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        reintegreFormik.setFieldValue(
          "montant",
          evaluate(values.montant).toString()
        );
      } catch (error) {
        try {
          reintegreFormik.setFieldValue(
            "montant",
            evaluate(
              values.montant.substring(1, values.montant.length)
            ).toString()
          );
        } catch (error) {
          errors.montant = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      setReintegre(values.montant);
      generalModalClose(4);
    },
  });
  return (
    <ScrollView style={[globalStyles.pageContainer, jourStyles.jourContainer]}>
      <Grid nCols={2} style={jourStyles.miniCardContainer}>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.right]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.right]}>
            <View style={jourStyles.miniCardContent}>
              <Calendar
                style={{ marginRight: 10 }}
                filled={true}
                color={fourth_color}
                size={2}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  {capitalise(type)}
                </Textc>
                <Textc style={{ marginBottom: 0.35 * fontSize }}>
                  {formatDate}
                </Textc>
              </View>
            </View>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.left]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.left]}>
            <View style={jourStyles.miniCardContent}>
              <CheckDollar
                style={{ marginRight: 10 }}
                color={fourth_color}
                size={2}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Budget
                </Textc>
                <Textc style={jourStyles.p}>{`${budget}DT`}</Textc>
              </View>
            </View>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.right]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.right]}>
            <TouchableOpacity
              style={jourStyles.miniCardContent}
              onPress={() =>
                generalModalOpen(3, {
                  date: formatDate,
                  type: type,
                  montant: cash.toString(),
                })
              }
            >
              <Cash
                style={{ marginRight: 10 }}
                filled={true}
                color={fourth_color}
                size={2}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Cash
                </Textc>
                <Textc style={jourStyles.p}>
                  {cash === "" ? "-" : `${cash}DT`}
                </Textc>
              </View>
            </TouchableOpacity>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.left]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.left]}>
            <View style={jourStyles.miniCardContent}>
              <Bill
                style={{ marginRight: 10 }}
                filled={true}
                color={fourth_color}
                size={2}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Dépenses
                </Textc>
                <Textc style={jourStyles.p}>
                  {`${sommeDepenses(content)}DT`}
                </Textc>
              </View>
            </View>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.right]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.right]}>
            <TouchableOpacity
              style={jourStyles.miniCardContent}
              onPress={() =>
                generalModalOpen(4, {
                  date: formatDate,
                  type: type,
                  montant: reintegre,
                })
              }
            >
              <Refund
                style={{ marginRight: 10 }}
                filled={true}
                color={fourth_color}
                size={2}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Réintégré
                </Textc>
                <Textc style={jourStyles.p}>
                  {reintegre === "" ? "-" : `${reintegre}DT`}
                </Textc>
              </View>
            </TouchableOpacity>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.left]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.left]}>
            <TouchableOpacity
              style={jourStyles.miniCardContent}
              onPress={() =>
                generalModalOpen(2, {
                  date: formatDate,
                  type: type,
                  montant: epargne,
                })
              }
            >
              <Save style={{ marginRight: 10 }} color={fourth_color} size={2} />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Épargné
                </Textc>
                <Textc style={jourStyles.p}>
                  {epargne === "" ? "-" : `${epargne}DT`}
                </Textc>
              </View>
            </TouchableOpacity>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG]}
        >
          <Card style={[jourStyles.miniCard]}>
            <View style={[jourStyles.miniCardContent]}>
              <Wallet
                style={{ marginRight: 30, transform: [{ rotate: "-45deg" }] }}
                color={fourth_color}
                size={2}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Reste
                </Textc>
                <Textc style={jourStyles.p}>{`${reste}DT`}</Textc>
              </View>
            </View>
          </Card>
        </ImageBackground>
      </Grid>
      <View style={jourStyles.addButtonContainer}>
        <CircleButton
          btnStyle={jourStyles.circleBtn}
          onPress={() =>
            generalModalOpen(0, { date: type === "jour" ? formatDate : "" })
          }
          title={
            <FontAwesome5
              name="plus"
              size={fontSize * 1.5}
              color={fourth_color}
            />
          }
        />
      </View>
      <Card style={{ marginBottom: 10 }}>
        <Table
          nbIcons={2}
          headers={week}
          content={content}
          dateIndexTab={[0]}
          toIgnore={["id"]}
        />
      </Card>

      <Modalc show={show[0]} closeFunction={() => generalModalClose(0)}>
        <View className="depense-modal">
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Tu as encore depensé !
          </Textc>
          <View style={"form"}>
            {type !== "jour" ? (
              <Input
                color={fourth_color}
                type={type}
                date={date}
                onChange={(e) => addFormik.setFieldValue("date", e)}
                value={addFormik.values.date}
                id="date"
                placeholder="Date"
                error={addFormik.errors?.date}
              />
            ) : null}
            <Input
              color={fourth_color}
              type="number"
              onChange={(e) => addFormik.setFieldValue("montant", e)}
              value={addFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={addFormik.errors?.montant}
            />
            <Input
              color={fourth_color}
              type="text"
              onChange={(e) => addFormik.setFieldValue("commentaire", e)}
              value={addFormik.values.commentaire}
              id="commentaire"
              placeholder="Commentaire"
              error={addFormik.errors?.commentaire}
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
            Encore une modification ?
          </Textc>
          <View style={"form"}>
            {type !== "jour" ? (
              <Input
                color={fourth_color}
                type={type}
                date={date}
                onChange={(val) => editFormik.setFieldValue("date", val)}
                value={editFormik.values.date}
                id="date"
                placeholder="Date"
                error={editFormik.errors?.date}
              />
            ) : null}
            <Input
              color={fourth_color}
              type="number"
              onChange={(val) => editFormik.setFieldValue("montant", val)}
              value={editFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={editFormik.errors?.montant}
            />
            <Input
              color={fourth_color}
              type="text"
              onChange={(val) => editFormik.setFieldValue("commentaire", val)}
              value={editFormik.values.commentaire}
              id="commentaire"
              placeholder="Commentaire"
              error={editFormik.errors?.commentaire}
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
      <Modalc show={show[2]} closeFunction={() => generalModalClose(2)}>
        <View className="depense-modal">
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Qui n'épargne pas un sou n'en aura jamais deux !
          </Textc>
          <View style={"form"}>
            <Input
              color={fourth_color}
              type="number"
              onChange={(val) => epargneFormik.setFieldValue("montant", val)}
              value={epargneFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={epargneFormik.errors?.montant}
            />
            <View style={modalStyles.modalBtnContainer}>
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={epargneFormik.handleSubmit}
                title="Confirmer"
              />
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={() => generalModalClose(2)}
                title="Annuler"
              />
            </View>
          </View>
        </View>
      </Modalc>

      <Modalc show={show[3]} closeFunction={() => generalModalClose(3)}>
        <View className="depense-modal">
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Le cash est à l'entreprise ce que le sang est à l'organisme!
          </Textc>
          <View style={"form"}>
            <Input
              color={fourth_color}
              type="number"
              onChange={(val) => cashFormik.setFieldValue("montant", val)}
              value={cashFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={cashFormik.errors?.montant}
            />
            <View style={modalStyles.modalBtnContainer}>
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={cashFormik.handleSubmit}
                title="Confirmer"
              />
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={() => generalModalClose(3)}
                title="Annuler"
              />
            </View>
          </View>
        </View>
      </Modalc>

      <Modalc show={show[4]} closeFunction={() => generalModalClose(4)}>
        <View className="depense-modal">
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Le cash est à l'entreprise ce que le sang est à l'organisme!
          </Textc>
          <View style={"form"}>
            <Input
              color={fourth_color}
              type="number"
              onChange={(val) => reintegreFormik.setFieldValue("montant", val)}
              value={reintegreFormik.values.montant}
              id="montant"
              placeholder="Montant"
              error={reintegreFormik.errors?.montant}
            />
            <View style={modalStyles.modalBtnContainer}>
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={reintegreFormik.handleSubmit}
                title="Confirmer"
              />
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={() => generalModalClose(4)}
                title="Annuler"
              />
            </View>
          </View>
        </View>
      </Modalc>
      <ConfirmModal
        show={show[5]}
        closeFunction={() => generalModalClose(5)}
        text="Voulez vous supprimer cet element ?"
        confirmFunction={() => confirmFunction()}
      />
    </ScrollView>
  );
}
