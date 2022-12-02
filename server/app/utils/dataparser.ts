import {
  AdopterFromDb,
  AnimalFromDb,
  MatchFromDb,
  ShelterFromDb
} from '../types/dboutputs';
import { Adopter, Animal, Shelter } from '../types/models';

//TODO: FOR MESSAGES CREATED AT MUST BE

const dataParser = {
  adopter: (data: AdopterFromDb) => {
    const res: Adopter = {
      id: data.id,
      description: data.user.general.description,
      email: data.user.email,
      longitude: data.user.location.longitude,
      latitude: data.user.location.latitude,
      address: data.user.location.address,
      first_name: data.first_name,
      last_name: data.last_name,
      age: data.age,
      house_type: data.house_type,
      has_pets: data.has_pets,
      has_children: data.has_children,
      time_at_home: data.time_at_home,
      images: data.user.general.images
    };

    return res;
  },

  shelter: (data: ShelterFromDb) => {
    const res: Shelter = {
      id: data.id,
      description: data.user.general.description,
      email: data.user.email,
      longitude: data.user.location.longitude,
      latitude: data.user.location.latitude,
      address: data.user.location.address,
      images: data.user.general.images,
      animals: (data.animals as unknown as Animal[]).map((animal) =>
        dataParser.animal(animal as unknown as AnimalFromDb)
      ),
      name: data.name
    };

    return res;
  },

  animal: (data: AnimalFromDb) => {
    const res: Animal = {
      id: data.id,
      description: data.general.description,
      age: data.age,
      weight: data.weight,
      shelterId: data.shelterId,
      shelterName: data.shelter.name,
      images: data.general.images,
      name: data.name,
      distance: data.distance
    };

    return res;
  },

  animalLike: (data: AdopterFromDb) => {
    const res: Adopter = {
      ...dataParser.adopter(data),
      like_date: data.adopter_animal?.createdAt
    };

    return res;
  },

  shelterMatch: (data: MatchFromDb, adopter: AdopterFromDb) => {
    const res: { adopter: Adopter; animal: Animal; date?: string } = {
      adopter: dataParser.adopter(adopter),
      animal: {
        name: data.name,
        age: data.age,
        weight: data.weight,
        images: data.general.images,
        id: data.id
      },
      date: adopter.adopter_animal?.updatedAt
    };

    return res;
  }
};

export default dataParser;
