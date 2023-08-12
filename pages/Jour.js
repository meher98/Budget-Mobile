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
  updateDepense,
} from "../backEnd/dao/depenseDao";
import {
  addBudget,
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
import CloudSync from "../icons/CloudSync";
import Month from "../icons/Month";
import Week from "../icons/Week";
import {
  addReintegre,
  getReintegre,
  getResidu,
} from "../backEnd/dao/reintegreDao";

export default function Jour() {
  const [show, setShow] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [epargne, setEpargne] = useState("");
  const [cash, setCash] = useState("");
  const [budget, setBudget] = useState("");
  const [reste, setReste] = useState("");
  const [reintegre, setReintegre] = useState("");
  const [reintegreMois, setReintegreMois] = useState("");
  const [reintegreSemaine, setReintegreSemaine] = useState("");
  const [residu, setResidu] = useState("");
  const week = ["Date", "Dépenses", "Commentaire", "Actions"];
  const { type, date } = useRoute().params;
  const dateType = useContext(DateContext);
  const [formatDate, setFormatDate] = useState();
  const [idToDelete, setIdToDelete] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");

  const update = () => {
    getReintegre({ date: formatDate, type: type })
      .then((val) => {
        setReintegre(val.reintegre ? val.reintegre : "");
        setReintegreMois(val.reintegreMois ? val.reintegreMois : "");
        setReintegreSemaine(val.reintegreSemaine ? val.reintegreSemaine : "");
      })
      .catch((e) => {
        console.log(e);
      });
    getResidu({ date: formatDate, type: type })
      .then((val) => {
        setResidu(val.residu ? val.residu : "");
      })
      .catch((e) => {
        console.log(e);
      });
    getCash(formatDate, type)
      .then((val) => {
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
            if (val) {
              setBudget(val.budget);
              setReste(val.reste);
            } else {
              setBudget("");
              setReste("");
            }
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
            if (val) {
              setBudget(val.budget);
              setReste(val.reste);
            } else {
              setBudget("");
              setReste("");
            }
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
            if (val) {
              setBudget(val.budget);
              setReste(val.reste);
            } else {
              setBudget("");
              setReste("");
            }
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
            onPress={() => {
              generalModalOpen(1, {
                date: el.date,
                montant: el.montant.toString(),
                commentaire: el.commentaire,
              });
              setIdToUpdate(el.id);
            }}
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
              generalModalOpen(6);
              setIdToDelete(el.id);
            }}
          >
            <FontAwesome5
              name="trash"
              size={fontSize * 1.1}
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
  const sommeReintegre = () => {
    let x = 0;
    let tab = [
      parseFloat(reintegre),
      parseFloat(reintegreMois),
      parseFloat(reintegreSemaine),
    ];
    tab.forEach((el) => {
      if (!isNaN(el)) {
        x += el;
      }
    });
    return Number(x.toFixed(2));
  };
  const generalModalClose = (i) => {
    const formik = [
      addFormik,
      editFormik,
      epargneFormik,
      cashFormik,
      reintegreFormik,
      budgetFormik,
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
      budgetFormik,
    ];
    let x = [false, false, false, false, false, false, false];
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
    generalModalClose(6);
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
      updateDepense(idToUpdate, values)
        .then((val) => {
          setContent([...addActionsToData([val]), ...content]);
          update();
          generalModalClose(1);
        })
        .catch((e) => {
          console.log(e);
        });
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
      addReintegre(values)
        .then(async (val) => {
          await console.log(val);
          update();
          generalModalClose(4);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  const budgetFormik = useFormik({
    initialValues: {
      budget: budget.toString(),
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        budgetFormik.setFieldValue(
          "budget",
          evaluate(values.budget).toString()
        );
      } catch (error) {
        try {
          budgetFormik.setFieldValue(
            "budget",
            evaluate(
              values.budget.substring(1, values.budget.length)
            ).toString()
          );
        } catch (error) {
          errors.budget = "Veillez saisir un nombre ou une equation valide";
        }
        return errors;
      }
    },
    onSubmit: (values) => {
      addBudget(values)
        .then((val) => {
          update();
          generalModalClose(5);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  return (
    <ScrollView style={[globalStyles.pageContainer, jourStyles.jourContainer]}>
      <Grid nCols={2} style={jourStyles.miniCardContainer}>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.left]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.left]}>
            <View style={jourStyles.miniCardContent}>
              <Calendar filled={true} color={fourth_color} size={2} />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  {capitalise(type)}
                </Textc>
                <Textc style={jourStyles.p}>{formatDate}</Textc>
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
              <Cash filled={true} color={fourth_color} size={2} />
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
            <TouchableOpacity
              style={jourStyles.miniCardContent}
              onPress={() =>
                generalModalOpen(5, {
                  date: formatDate,
                  type: type,
                  budget: budget.toString(),
                })
              }
            >
              <View style={jourStyles.miniCardContent}>
                <CheckDollar color={fourth_color} size={2} />
                <View>
                  <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                    Budget
                  </Textc>
                  <Textc style={jourStyles.p}>
                    {budget === "" ? "-" : budget + "DT"}
                  </Textc>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.right]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.right]}>
            <TouchableOpacity
              style={jourStyles.miniCardContent}
              onPress={() => {
                generalModalOpen(4, {
                  date: formatDate,
                  type: type,
                  montant: reintegre.toString(),
                });
              }}
            >
              <Refund filled={true} color={fourth_color} size={2} />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Réintégré
                </Textc>
                <Textc style={jourStyles.p}>
                  {reintegre === "" &&
                  reintegreMois === "" &&
                  reintegreSemaine === ""
                    ? "-"
                    : `${sommeReintegre()}DT`}
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
              <Bill filled={true} color={fourth_color} size={2} />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Dépenses
                </Textc>
                <Textc style={jourStyles.p}>
                  {sommeDepenses(content) === 0
                    ? "-"
                    : sommeDepenses(content) + "DT"}
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
                generalModalOpen(2, {
                  date: formatDate,
                  type: type,
                  montant: epargne,
                })
              }
            >
              <Save color={fourth_color} size={2} />
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
          imageStyle={[globalStyles.waveBG, jourStyles.left]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.left]}>
            <View style={[jourStyles.miniCardContent]}>
              <Wallet
                style={{ marginLeft: 4, transform: [{ rotate: "-45deg" }] }}
                color={fourth_color}
                size={1.8}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Reste
                </Textc>
                <Textc style={jourStyles.p}>
                  {reste === "" ? "-" : reste + "DT"}
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
            <View style={jourStyles.miniCardContent}>
              <CloudSync color={fourth_color} size={2} />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Résidu
                </Textc>
                <Textc style={jourStyles.p}>
                  {residu != 0 ? residu + "DT" : "-"}
                </Textc>
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
        <View>
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Tu as encore depensé !
          </Textc>
          <View>
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
        <View>
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Encore une modification ?
          </Textc>
          <View>
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
        <View>
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Qui n'épargne pas un sou n'en aura jamais deux !
          </Textc>
          <View>
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
        <View>
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Le cash est à l'entreprise ce que le sang est à l'organisme!
          </Textc>
          <View>
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
        <View>
          <Textc color="fourth" style={confirmModalStyles.h1}>
            {type === "jour"
              ? "Réintégré aux prochains :"
              : type === "semaine"
              ? "Réintégré à la prochaine semaine :"
              : "Réintégré au prochain mois :"}
          </Textc>
          {type === "jour" ? (
            <Grid nCols={2}>
              <ImageBackground
                source={require("../assets/waves.png")}
                imageStyle={[globalStyles.waveBG, jourStyles.leftM]}
              >
                <Card style={[jourStyles.miniCard, jourStyles.leftM]}>
                  <View style={jourStyles.miniCardContent}>
                    <Month filled={true} color={fourth_color} size={2} />
                    <View>
                      <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                        Mois
                      </Textc>
                      <Textc style={jourStyles.p}>
                        {reintegreMois !== "" ? `${reintegreMois}DT` : "-"}
                      </Textc>
                    </View>
                  </View>
                </Card>
              </ImageBackground>
              <ImageBackground
                source={require("../assets/waves.png")}
                imageStyle={[globalStyles.waveBG, jourStyles.rightM]}
              >
                <Card style={[jourStyles.miniCard, jourStyles.rightM]}>
                  <View style={jourStyles.miniCardContent}>
                    <Week filled={true} color={fourth_color} size={2} />
                    <View>
                      <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                        Semaine
                      </Textc>
                      <Textc style={jourStyles.p}>
                        {reintegreSemaine !== ""
                          ? `${reintegreSemaine}DT`
                          : "-"}
                      </Textc>
                    </View>
                  </View>
                </Card>
              </ImageBackground>
            </Grid>
          ) : null}
          <View>
            <Input
              color={fourth_color}
              type="number"
              onChange={(val) => reintegreFormik.setFieldValue("montant", val)}
              value={reintegreFormik.values.montant}
              id="montant"
              placeholder={type === "jour" ? "Jour" : "Montant"}
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
      <Modalc show={show[5]} closeFunction={() => generalModalClose(5)}>
        <View>
          <Textc color="fourth" style={confirmModalStyles.h1}>
            Le budget est à l'entreprise ce que le sang est à l'organisme!
          </Textc>
          <View>
            <Input
              color={fourth_color}
              type="number"
              onChange={(val) => budgetFormik.setFieldValue("budget", val)}
              value={budgetFormik.values.budget}
              id="montant"
              placeholder="Montant"
              error={budgetFormik.errors?.budget}
            />
            <View style={modalStyles.modalBtnContainer}>
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={budgetFormik.handleSubmit}
                title="Confirmer"
              />
              <RoundButton
                btnStyle={modalStyles.roundBtn}
                textStyle={modalStyles.roundBtnText}
                onPress={() => generalModalClose(5)}
                title="Annuler"
              />
            </View>
          </View>
        </View>
      </Modalc>
      <ConfirmModal
        show={show[6]}
        closeFunction={() => generalModalClose(6)}
        text="Voulez vous supprimer cet element ?"
        confirmFunction={() => confirmFunction()}
      />
    </ScrollView>
  );
}
