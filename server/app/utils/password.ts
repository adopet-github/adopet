import bcrypt from 'bcrypt';

export const compare = async (input: string, db: string) => await bcrypt.compare(input, db);
export const genPasswordAndSalt = async (plainPassword: string) => {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(plainPassword, salt);

  return { salt, password };
}
