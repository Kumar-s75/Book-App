'use server';
import books from '@database/schema'
const  createBook= async (params:BookParams)=>{
      try{
        const newBook=await db
        .insert(books);
        .values(value:{
          ...params,
          availableCopies: params.totalCopies
        })
        .returning();

        return{
          success:true,
          data:JSON.parse(JSON.stringify(newBook[0]))
        };
      } catch(error){
          console.log(error);

          return {
            success:false,
            message:'An error occured while creating the book'
          }
      }
}