import conf from '../conf/conf'
import {Client,Databases,Query} from "appwrite";
export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                featuredImage,
                status,
                userId,
                content,
            })
        } catch (error) {
            console.log(error); 
        }

    }
    async updatePost(slug,{title,featuredImage,status,content}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,featuredImage,status,content})
        } catch (error) {
            console.log(error);
        }

    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument
            (conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug);
            return true
        }
         catch (error) {
            console.log(error);
            return false;
        }

    }
    async getPost(slug){
        try {
            return this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug)
        } catch (error) {
           console.log(error);
           return false 
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
}
const service  = new Service();
export default service
