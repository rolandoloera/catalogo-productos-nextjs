--
-- PostgreSQL database dump
--

\restrict e4uHeX6JMFdF3i5pgLxYGAOdv4jhZlHOMywEuvo9BD6f0NrstCghK3PID1ARdFK

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: catalogo_productos_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO catalogo_productos_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: producto_imagenes; Type: TABLE; Schema: public; Owner: catalogo_productos_user
--

CREATE TABLE public.producto_imagenes (
    id integer NOT NULL,
    producto_id integer NOT NULL,
    imagen_url character varying(500) NOT NULL,
    orden integer DEFAULT 0,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.producto_imagenes OWNER TO catalogo_productos_user;

--
-- Name: producto_imagenes_id_seq; Type: SEQUENCE; Schema: public; Owner: catalogo_productos_user
--

CREATE SEQUENCE public.producto_imagenes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_imagenes_id_seq OWNER TO catalogo_productos_user;

--
-- Name: producto_imagenes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: catalogo_productos_user
--

ALTER SEQUENCE public.producto_imagenes_id_seq OWNED BY public.producto_imagenes.id;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: catalogo_productos_user
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    stock integer DEFAULT 0,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    imagen_url character varying(500)
);


ALTER TABLE public.productos OWNER TO catalogo_productos_user;

--
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: catalogo_productos_user
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO catalogo_productos_user;

--
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: catalogo_productos_user
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: catalogo_productos_user
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    nombre character varying(100),
    rol character varying(20) DEFAULT 'admin'::character varying,
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO catalogo_productos_user;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: catalogo_productos_user
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO catalogo_productos_user;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: catalogo_productos_user
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: producto_imagenes id; Type: DEFAULT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.producto_imagenes ALTER COLUMN id SET DEFAULT nextval('public.producto_imagenes_id_seq'::regclass);


--
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: producto_imagenes; Type: TABLE DATA; Schema: public; Owner: catalogo_productos_user
--

COPY public.producto_imagenes (id, producto_id, imagen_url, orden, fecha_creacion) FROM stdin;
3	2	https://res.cloudinary.com/dhtmxtrdp/image/upload/v1762987649/catalogo-productos/m0zg33n0dnwucxnptbhd.jpg	0	2025-11-12 22:47:31.949557
4	2	https://res.cloudinary.com/dhtmxtrdp/image/upload/v1762987650/catalogo-productos/mcytqhxwatkxytycvbpr.jpg	1	2025-11-12 22:47:31.963406
5	3	https://res.cloudinary.com/dhtmxtrdp/image/upload/v1762987675/catalogo-productos/ojlk7tpdyking3llblnb.jpg	0	2025-11-12 22:47:57.428945
6	3	https://res.cloudinary.com/dhtmxtrdp/image/upload/v1762987676/catalogo-productos/zlcw9ip9jfxpoehaokd7.jpg	1	2025-11-12 22:47:57.430961
7	1	https://res.cloudinary.com/dhtmxtrdp/image/upload/v1762987622/catalogo-productos/qv9jpv8qpbnmdcqf9p8b.png	0	2025-11-14 16:56:49.431002
8	1	https://res.cloudinary.com/dhtmxtrdp/image/upload/v1762987624/catalogo-productos/akw0jbk0elmavtlvy4t0.png	1	2025-11-14 16:56:49.548142
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: catalogo_productos_user
--

COPY public.productos (id, nombre, descripcion, precio, stock, fecha_creacion, fecha_actualizacion, imagen_url) FROM stdin;
2	iPhone XR	En caja	1500.00	5	2025-11-11 22:59:48.958586	2025-11-12 22:47:31.935099	\N
3	Teclado fisico	Mecanico	50.00	202	2025-11-11 22:59:48.958586	2025-11-12 22:47:57.425513	\N
1	Mouse	alambrico nuevo de paquete	100.50	10	2025-11-11 22:59:48.958586	2025-11-14 16:56:49.200914	\N
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: catalogo_productos_user
--

COPY public.usuarios (id, email, password_hash, nombre, rol, activo, fecha_creacion, fecha_actualizacion) FROM stdin;
1	admin@catalogo.com	$2b$10$52yb61ilMZH6WyF5dhD9M.a0UYLC0Sy3nf4CPt6yFZsr51cjIbR02	Administrador	admin	t	2025-11-14 16:54:38.989281	2025-11-14 16:54:38.989281
\.


--
-- Name: producto_imagenes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: catalogo_productos_user
--

SELECT pg_catalog.setval('public.producto_imagenes_id_seq', 8, true);


--
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: catalogo_productos_user
--

SELECT pg_catalog.setval('public.productos_id_seq', 3, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: catalogo_productos_user
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: producto_imagenes producto_imagenes_pkey; Type: CONSTRAINT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.producto_imagenes
    ADD CONSTRAINT producto_imagenes_pkey PRIMARY KEY (id);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: idx_producto_imagenes_orden; Type: INDEX; Schema: public; Owner: catalogo_productos_user
--

CREATE INDEX idx_producto_imagenes_orden ON public.producto_imagenes USING btree (producto_id, orden);


--
-- Name: idx_producto_imagenes_producto_id; Type: INDEX; Schema: public; Owner: catalogo_productos_user
--

CREATE INDEX idx_producto_imagenes_producto_id ON public.producto_imagenes USING btree (producto_id);


--
-- Name: idx_usuarios_email; Type: INDEX; Schema: public; Owner: catalogo_productos_user
--

CREATE INDEX idx_usuarios_email ON public.usuarios USING btree (email);


--
-- Name: producto_imagenes producto_imagenes_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: catalogo_productos_user
--

ALTER TABLE ONLY public.producto_imagenes
    ADD CONSTRAINT producto_imagenes_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO catalogo_productos_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO catalogo_productos_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO catalogo_productos_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO catalogo_productos_user;


--
-- PostgreSQL database dump complete
--

\unrestrict e4uHeX6JMFdF3i5pgLxYGAOdv4jhZlHOMywEuvo9BD6f0NrstCghK3PID1ARdFK

