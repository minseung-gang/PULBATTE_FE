/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authInstance } from '../apis/axios';
import { postSignup } from '../apis/auth';

let cnt = 0;

export default function SignUpPage() {
  const formSchema = yup.object({
    userId: yup.string().email('이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .min(8, '최소 8자리 이상 가능합니다')
      .max(15, '최대 15자리 까지 가능합니다')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
        '영문, 숫자, 특수문자를 포함해주세요',
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
  });

  // 객체 비구조화 할당 data 로 넘어오는 hookform데이터중에서 필요한 값만 받아오기 위해서

  const onSubmit = async ({ userId, password }) => {
    const res = await postSignup({ userId, password });
    console.log(res);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  cnt += 1;

  console.log(cnt);

  return (
    <StSignUpContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <p>이메일</p>
        <StInput
          name="userId"
          placeholder="이메일을 입력해 주세요"
          {...register('userId')}
        />
        <StErrorMessage>
          {errors.userId && <p>{errors.userId.message}</p>}
        </StErrorMessage>
        <p>비밀번호</p>
        <StInput
          type="password"
          name="password"
          placeholder="영문, 숫자 조합 8글자 이상"
          {...register('password')}
        />
        <StErrorMessage>
          {errors.password && <p>{errors.password.message}</p>}
        </StErrorMessage>
        <StInput
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          {...register('passwordConfirm')}
        />
        <StErrorMessage>
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        </StErrorMessage>
        <StSubmitButton
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          회원 가입하기
        </StSubmitButton>
      </form>
    </StSignUpContainer>
  );
}

const StSignUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StInput = styled.input`
  width: 372px;
  height: 58px;
  display: block;
`;
const StSubmitButton = styled.button`
  display: block;
  width: 372px;
  height: 58px;
`;
const StErrorMessage = styled.span`
  min-height: 20px;
  font-size: 0.8rem;
  color: #de2626;
  display: flex;
  align-items: center;
  margin: 0;
  p {
    margin: 0;
  }
`;
