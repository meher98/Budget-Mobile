import { sequelize } from "../options";
import { Budget } from "../model/budgetModel";
import { Cash } from "../model/cashModel";
import { Reintegre } from "../model/reintegreModel";
import { ReintegreGlobal } from "../model/reintegreGlobalModel";
import { Depense } from "../model/depenseModel";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

const models = [Budget, Depense, Cash, ReintegreGlobal, Reintegre];
export const exportData = async () => {
  tab = [];
  for (el of models) {
    let x = await el.findAll();
    tab.push(x);
  }
  let json = { data: tab };
  const permissions =
    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (permissions.granted) {
    let directoryUri = permissions.directoryUri;
    let data = JSON.stringify(json);
    // Create file and pass it's SAF URI
    await FileSystem.StorageAccessFramework.createFileAsync(
      directoryUri,
      "budgetDB",
      "application/json"
    )
      .then(async (fileUri) => {
        // Save data to newly created file
        await FileSystem.writeAsStringAsync(fileUri, data, {
          encoding: FileSystem.EncodingType.UTF8,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
export const importData = async () => {
  const t = await sequelize.transaction();
  try {
    const fileUri = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });

    const { data } = JSON.parse(
      await FileSystem.StorageAccessFramework.readAsStringAsync(fileUri.uri)
    );
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        await models[i].create(data[i][j], { transaction: t });
      }
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
  }
};
