import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"
import { CreateUserParams, GetMenuParams, SignInParams } from "type";

export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  platform: "com.example.fast-food",
  bucketId: "6896273f002fca1c997c",
  projectId: "68923451003a300cde71",
  databaseId: "68950751002396ca5199",
  menuCollectionId: "68961e37001fe2611c9c",
  userCollectionId: "6895076100317ebff4ef",
  categoriesCollectionId: "68961bc10032bb7527db",
  customizationCollectionId: "689622760020ca95ab59",
  menuCustomizationCollectionId: "689624bc0034232607fd",

}

export const client: Client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

export const account: Account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

  } catch (e) {
    throw new Error(e as string);
  }
}

export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl }
    );
  } catch (e) {
    throw new Error(e as string);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
    throw new Error(e as string);
  }
}

export const getMenu = async ({ query, category }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (!!query) queries.push(Query.search("name", query));
    if (!!category) queries.push(Query.equal("categories", category));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    )

    return menus.documents;
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    )

    return categories.documents;
  } catch (error) {
    throw new Error(error as string)
  }
}