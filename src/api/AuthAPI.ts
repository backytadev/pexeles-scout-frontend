import { isAxiosError } from 'axios';
import api from '@/lib/axios';

import { User } from '@/interfaces/user-response.interface';
import { UserResponse } from '@/interfaces/user-response.interface';
import { UserFormData } from '@/interfaces/user-form-data.interface';
import { PexelesQueryParams } from '@/interfaces/pexeles-query-params';
import { LoginFormData } from '@/interfaces/login-form-data.interface';
import { PexelesApiResponse } from '@/interfaces/pexeles-api-response.interface';
import { UserPasswordUpdateFormData } from '@/interfaces/user-password-update-form-data.interface';

export async function createUser(formData: UserFormData) {
  try {
    const { data } = await api.post<string>('/auth/create-user', formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
}

export async function loginUser(formData: LoginFormData) {
  try {
    const { data } = await api.post<string>('/auth/login', formData);

    localStorage.setItem('AUTH_TOKEN', data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
}

export async function updateProfile(formData: UserFormData) {
  try {
    const { data } = await api.put<string>('/auth/update-profile', formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
}

export async function changePassword(formData: UserPasswordUpdateFormData) {
  try {
    const { data } = await api.put<string>('/auth/update-password', formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api<User>('/auth/get-user');

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
}

export async function getAllUsers() {
  try {
    const response = await api<UserResponse>('/auth/get-all-users');

    return response.data.users;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
}

export async function deleteUser(userId: string) {
  try {
    const { data } = await api.delete<string>(`/auth/${userId}`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
}

// export async function getPexelesImages(params: PexelesQueryParams) {
//   const { query, page, perPage } = params;
//   try {
//     const { data } = await api<PexelesApiResponse>(
//       `/auth/get-images?query=${query}&page=${page}&per_page=${perPage}`
//     );

//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw error;
//     }
//   }
// }

export async function queryPexelesApi(params: PexelesQueryParams) {
  const { query, page, perPage } = params;

  const resp = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}`,
    {
      method: 'GET',
      headers: {
        Authorization: import.meta.env.VITE_API_KEY_PEXELES,
      },
    }
  );

  const data: PexelesApiResponse = await resp.json();

  return data;
}
