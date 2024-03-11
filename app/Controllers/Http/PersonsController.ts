import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from '../../Models/Person'
export default class PersonsController {
    // GET CALL (ALL Records)
    public async index({ response }: HttpContextContract) {
        try {
            const persons = await Person.all();
            if (persons)
            {
                // console.log(persons)
                return response.status(200).json(persons)
            }
        }
        catch (error) {
            console.error('Error fetching persons: ',error);
            return response.status(500).json({
                success: false,
                message: 'failed to fetch persons'
            })
        }
    }

    // POST CALL (Add new data)
    public async store ({request, response}: HttpContextContract) {
        try {
            const personData = request.only(['first_name','last_name','ph_number','dob']);
            const persons = await Person.create(personData);

            return response.status(201).json(persons);
        } catch (error) {
            console.error('Error creating a new person', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to create a new Person'
            });
        }
    }

    // PUT CALL (Update the existing record by the id)
    public async update({ params, request, response }: HttpContextContract) {
        try {
            const person = await Person.findOrFail(params.id); // Find the person by ID
            const inputData = request.only(['first_name','last_name','ph_number','dob']); // Adjust fields based on your model
    
            person.merge(inputData); // Merge new data into existing person
            await person.save(); // Save changes
    
            return response.status(200).json(person);
        } catch (error) {
            console.error('Error updating person: ', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to update person'
            });
        }
    }

    // DELETE CALL (Delete record by id)
    public async destroy({ params, response }: HttpContextContract) {
        try {
            const person = await Person.findOrFail(params.id); // Find the person by ID
    
            await person.delete(); // Delete the person
    
            return response.status(200).json({
                success: true,
                message: 'Person successfully deleted'
            });
        } catch (error) {
            console.error('Error deleting person: ', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to delete person'
            });
        }
    }
    
    // GET PERSON BY ID
    public async show({ params, response }: HttpContextContract) {
        try {
            const person = await Person.find(params.id);
    
            if (!person) {
                return response.status(404).json({
                    success: false,
                    message: 'Person not found'
                });
            }
    
            return response.status(200).json(person);
        } catch (error) {
            console.error('Error fetching person: ', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch person'
            });
        }
    }
}
